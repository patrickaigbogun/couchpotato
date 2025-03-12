const getEnvVar = (key: string, required: boolean = true): string => {
	const value = process.env[key];
	if (required && !value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return value ?? '';
};

// TMDB Configuration (Client-side accessible)
export const TMDB = {
	apiKey: getEnvVar('NEXT_PUBLIC_TMDB_API_KEY'),
	apiUrl: getEnvVar('NEXT_PUBLIC_TMDB_API_URL'),
	imageUrl: getEnvVar('NEXT_PUBLIC_TMDB_IMAGE_URL'),
	movieUrl: getEnvVar('NEXT_PUBLIC_TMDB_MOVIE_URL'),
	bearerToken: getEnvVar('NEXT_PUBLIC_TMDB_BEARER_TOKEN'),
} as const;

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

// export const cloudinaryName = {
// 	apiKey: getEnvironmentVariable("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
// };

// export const cloudinaryApiKey = {
// 	apiKey: getEnvironmentVariable("NEXT_PUBLIC_CLOUDINARY_API_KEY"),
// };

// export const cloudinaryApiSecret = {
// 	apiKey: getEnvironmentVariable("CLOUDINARY_API_SECRET"),
// };

// export const cloudinaryUrl = {
// 	apiKey: getEnvironmentVariable("API_ENV_VARIABLE_CLOUDINARY_URL"),
// };

// export const supabase = {
// 	supabase_url: getEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL"),
// 	supabase_anon_key: getEnvironmentVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
// 	connection_url: getEnvironmentVariable("SUPABASE_DATABASE_URL"),
// };

// export const agora = {
// 	appId: getEnvironmentVariable("NEXT_PUBLIC_AGORA_APP_ID"),
// 	token: getEnvironmentVariable("NEXT_PUBLIC_AGORA_TEMP_TOKEN"),
// };

// export const backendApi = {
// 	endpoint: getEnvironmentVariable("BACKEND_API_ENDPOINT"),
// };
