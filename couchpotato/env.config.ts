export const getEnvVar = (key: string, required: boolean = true): string => {
	const value = process.env[key];
	if (required && !value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return value ?? '';
};

// TMDB Configuration (Client-side accessible)


// Server-side only configurations
export const DATABASE = {
	get url() {
		return getEnvVar('NEON_DATABASE_URL');
	}
} as const;

export const AUTH = {
	get jwtSecret() {
		return getEnvVar('JWT_SECRET');
	}
} as const;
