import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/constants/db';
import { users } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '@/env.config';
import { User, UserResponse } from '@/types/user';

/**
 * User Registration API Route
 * 
 * This Next.js API route handles new user registration by creating user accounts
 * in the database with securely hashed passwords.
 * 
 * Endpoint: POST /api/auth/register
 * 
 * Request Body:
 * {
 *   email: string    - User's email address
 *   password: string - User's password (will be hashed)
 *   username: string - User's chosen username
 * }
 * 
 * Responses:
 * - 201: Successfully registered
 *   {
 *     user: {
 *       id: number,
 *       email: string,
 *       username: string
 *     },
 *     token: string,
 *     message: "User registered successfully"
 *   }
 * 
 * - 400: Validation error
 *   { error: "Missing required fields" }
 *   or
 *   { error: "Email or username already exists" }
 * 
 * - 500: Server error
 *   { error: "Internal server error" }
 * 
 * Security Features:
 * - Password hashing using bcrypt (10 rounds)
 * - Duplicate email/username checking
 * - Input validation
 */

export async function POST(request: Request) {
	try {
		const user: User = await request.json();

		// Validate input
		if (!user.email || !user.password || !user.username) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Check if email or username already exists
		const existingUser = await db
			.select()
			.from(users)
			.where(
				eq(users.email, user.email) ||
				eq(users.username, user.username)
			);

		if (existingUser.length > 0) {
			return NextResponse.json(
				{ error: 'Email or username already exists' },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(user.password, 10);

		// Insert new user
		const [newUser] = await db
			.insert(users)
			.values({
				email: user.email,
				password: hashedPassword,
				username: user.username,
			})
			.returning({
				id: users.id,
				email: users.email,
				username: users.username,
			});

		// Create JWT token
		const token = jwt.sign(
			{ userId: newUser.id },
			jwtSecret.apiKey,
			{ expiresIn: '24h' }
		);

		const response: UserResponse = {
			user: {
				username: newUser.username,
				email: newUser.email,
			},
			token,
			message: 'User registered successfully',
		};

		return NextResponse.json(response, { status: 201 });
	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
