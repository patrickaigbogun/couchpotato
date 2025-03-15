export const getEnvironmentVariable = (environmentVariable: string): string => {
	const unvalidatedEnvironmentVariable = process.env[environmentVariable];
	if (!unvalidatedEnvironmentVariable) {
		throw new Error(
			`Couldn't find environment variable: ${environmentVariable}`
		);
	} else {
		return unvalidatedEnvironmentVariable;
	}
};

// TMDB Configuration (Client-side accessible)


// Server-side only configurations
export const DATABASE = {
	get url() {
		return getEnvironmentVariable('NEON_DATABASE_URL');
	}
} as const;

export const AUTH = {
	get jwtSecret() {
		return getEnvironmentVariable('JWT_SECRET');
	}
} as const;
