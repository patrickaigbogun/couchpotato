"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TMDB } from "@/constants/tmdb";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

export default function Hero() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch popular movies from TMDB
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = TMDB.apiKey;
        const response = await fetch(
          `${TMDB.apiUrl}movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 7)); // Get the top 7 movies
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Handle animation timing
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 6000); // Change poster every 6 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="text-2xl font-bold">No movies found</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden z-10">
      {/* Animated background posters */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0" />
          <Image
            src={`${TMDB.OriginalImageUrl}${movie.backdrop_path}`}
            alt={movie.title}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
            sizes="100vw"
            className="z-0"
          />
        </div>
      ))}

      {/* Movie title pill - glassmorphic effect */}
      <div className="absolute bottom-1/3 left-8 md:left-16 z-20">
        <button
          onClick={() => handleMovieClick(movies[currentIndex].id)}
          className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-full border border-white/20
                     hover:bg-white/20 transition-all duration-300 text-white font-bold text-xl md:text-3xl
                     shadow-lg"
        >
          {movies[currentIndex].title}
        </button>
      </div>

      {/* Bottom movie selector/indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex flex-row justify-center space-x-6 overflow-x-auto">
          {movies.map((movie, index) => (
            <div
              key={`thumbnail-${movie.id}`}
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={`
                relative cursor-pointer rounded-xl transition-all duration-300
                w-24 h-36 md:w-72 md:h-36 flex-shrink-0
                ${index === currentIndex ? "ring-4 ring-white scale-105" : "opacity-100"}
              `}
            >
              <Image
                src={`${TMDB.OriginalImageUrl}${movie.poster_path}`}
                alt={movie.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 200px, 400px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

