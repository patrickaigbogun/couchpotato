import { getTvShowUrl, getTvShowCreditsUrl } from "@/constants/url";
import { TMDB } from "@/constants/tmdb";
import { TVShowDetails } from "@/types/tmdb/tvshow";

export async function getTvShowDetails(id: string): Promise<TVShowDetails> {
	if (!TMDB.apiKey) {
		throw new Error(`TMDB API key is not defined`);
	}

	try {
		// Fetch TV show details
		const tvShowResponse = await fetch(getTvShowUrl(id),
			{ next: { revalidate: 3600 } } // Cache for 1 hour
		);

		if (!tvShowResponse.ok) {
			console.error('Failed to fetch TV show details:', tvShowResponse);
			throw new Error('Failed to fetch TV show details');
		}

		const tvShowData = await tvShowResponse.json();

		// Fetch cast details
		const creditsResponse = await fetch(getTvShowCreditsUrl(id),
			{ next: { revalidate: 3600 } }
		);

		if (!creditsResponse.ok) {
			throw new Error('Failed to fetch TV show credits');
		}

		const creditsData = await creditsResponse.json();

		return {
			...tvShowData,
			cast: creditsData.cast
				.slice(0, 10)
				.map((actor: any) => ({
					id: actor.id,
					name: actor.name,
					character: actor.character,
					profile_path: actor.profile_path,
				})),
		};
	} catch (error) {
		console.error('Error fetching TV show data:', error);
		throw error;
	}
}
