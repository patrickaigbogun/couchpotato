export type UserRole = "user" | "mod" | "star" | "admin" | "superadmin";

export interface User {
	id: string;
	email: string;
	username: string;
	password: string;
	role: UserRole;
}

export interface UserResponse {
	user: Omit<User, "password">;
	token: string;
	message?: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
}
