import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/constants/db';
import { users } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { AUTH } from '@/env.config';
import { LoginCredentials, UserResponse } from '@/types/user';

/**
 * User Login API Route
 * 
 * This Next.js API route handles user authentication by verifying credentials
 * and issuing JWT tokens for successful logins.
 * 
 * Endpoint: POST /api/auth/login
 * 
 * Request Body:
 * {
 *   email: string    - User's email address
 *   password: string - User's password
 * }
 * 
 * Responses:
 * - 200: Successfully logged in
 *   {
 *     user: {
 *       email: string,
 *       username: string
 *     },
 *     token: string,
 *     message: "Login successful"
 *   }
 * 
 * - 400: Validation error
 *   { error: "Missing required fields" }
 * 
 * - 401: Authentication error
 *   { error: "Invalid credentials" }
 * 
 * - 500: Server error
 *   { error: "Internal server error" }
 */

export async function POST(request: Request) {
    try {
        const credentials: LoginCredentials = await request.json();

        // Validate input
        if (!credentials.email || !credentials.password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Find user by email
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email));

        // Check if user exists and verify password
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id },
            AUTH.jwtSecret,
            { expiresIn: '24h' }
        );

        const response: UserResponse = {
            user: {
                username: user.username,
                email: user.email,
            },
            token,
            message: 'Login successful'
        };

        // Create a response object
        const jsonResponse = NextResponse.json(response, { status: 200 });
        
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
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
