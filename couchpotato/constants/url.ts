import { tmdbMovieUrl } from "@/env.config";

export const baseUrl = `http://localhost:3000/`;

export const loginUrl = `${baseUrl}auth/login`

export const registerUrl = `${baseUrl}auth/register`

export const baseDashboardUrl = `${baseUrl}dashboard/`;

export const profileUrl = `${baseDashboardUrl}profile/`

export const watchUrl = `${baseUrl}watch/`

export const watchMovieUrl = (movieId: string): string => `${watchUrl}${movieId}`

export const getMovieUrl = (movieId: string): string => `${tmdbMovieUrl.apiKey}${movieId}?language=en-US`



