// import { getEnvVar } from "@/env.config";

export const TMDB = {
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    apiUrl: process.env.NEXT_PUBLIC_TMDB_API_URL,
    imageUrl: process.env.NEXT_PUBLIC_TMDB_IMAGE_URL,
    OriginalImageUrl: process.env.NEXT_PUBLIC_TMDB_ORIGINAL_IMAGE_URL,
    movieUrl: process.env.NEXT_PUBLIC_TMDB_MOVIE_URL,
    bearerToken: process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN,
} as const;