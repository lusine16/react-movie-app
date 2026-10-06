import { useEffect, useState } from 'react'
import { getTopMovies } from '../../api/movies'
import type { Movie } from '../../types/Movie'
import { MovieCard } from '../MovieCard/MovieCard'
import './TopMovies.css'

export function TopMovies() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    async function loadTopMovies() {
      const topMovies = await getTopMovies()

      setMovies(topMovies)
    }

    loadTopMovies()
  }, [])

  return (
    <section className="top-movies">
      <h2 className="top-movies__title">Топ 10 фильмов</h2>

      <div className="top-movies__grid">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            position={index + 1}
          />
        ))}
      </div>
    </section>
  )
}