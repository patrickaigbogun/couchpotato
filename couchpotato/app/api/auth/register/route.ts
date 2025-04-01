import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/constants/db';
import { users } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { User, UserResponse } from '@/types/user';
import { jwtSecret } from '@/constants/auth';

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
 *       username: string,
 *       role: string
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
 * - Default user role assignment
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

		// Insert new user with explicit role assignment
		const [newUser] = await db
			.insert(users)
			.values({
				email: user.email,
				password: hashedPassword,
				username: user.username,
				role: 'user', // Explicitly setting role to 'user' for all new registrations
			})
			.returning({
				id: users.id,
				username: users.username,
				role: users.role, // Return the role in the response
			});

		// Create JWT token
		const token = jwt.sign(
			{ 
				userId: newUser.id,
				role: newUser.role // Include role in JWT token for authorization purposes
			},
			jwtSecret,
			{ expiresIn: '24h' }
		);

		const response: UserResponse = {
			user: {
				username: newUser.username,
				role: newUser.role, // Include role in the response
			},
			token,
			message: 'User registered successfully',
		};

		// Create a response object
		const jsonResponse = NextResponse.json(response, { status: 201 });
		
		// Set the JWT token in an HttpOnly cookie
		jsonResponse.cookies.set({
			name: 'auth_token',
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // Secure in production
			sameSite: 'strict',
			maxAge: 60 * 60 * 24, // 24 hours in seconds
			path: '/',
		});

		return jsonResponse;
	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
