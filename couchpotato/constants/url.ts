import { TMDB } from "@/constants/tmdb";

export const baseUrl = `http://localhost:3000/`;

export const loginUrl = `${baseUrl}auth/login`

export const registerUrl = `${baseUrl}auth/register`

export const baseDashboardUrl = `${baseUrl}dashboard/`;

export const profileUrl = `${baseDashboardUrl}profile/`

export const watchUrl = `${baseUrl}watch/`

export const watchMovieUrl = (movieId: string): string => `${watchUrl}${movieId}`

export const getMovieUrl = (movieId: string): string => `${TMDB.movieUrl}${movieId}?api_key=${TMDB.apiKey}&language=en-US`

export const getCreditsUrl = (movieId: string): string => `${TMDB.movieUrl}${movieId}/credits?api_key=${TMDB.apiKey}&language=en-US`

export const getTvShowUrl = (tvShowId: string): string => `${TMDB.apiUrl}tv/${tvShowId}?api_key=${TMDB.apiKey}&language=en-US`;

export const getTvShowCreditsUrl = (tvShowId: string): string => `${TMDB.apiUrl}tv/${tvShowId}/credits?api_key=${TMDB.apiKey}&language=en-US`;



