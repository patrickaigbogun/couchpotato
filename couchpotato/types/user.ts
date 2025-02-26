export interface User {
	id?: number;
	email: string;
	username: string;
	password?: string;
}

export interface UserResponse {
	user: User;
	token: string;
	message: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}


