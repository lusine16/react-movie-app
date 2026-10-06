import { useEffect, useState } from 'react'
import { getRandomMovie } from '../../api/movies'
import { MovieHero } from '../../components/MovieHero/MovieHero'
import { TopMovies } from '../../components/TopMovies/TopMovies'
import type { Movie } from '../../types/Movie'

export function HomePage() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getRandomMovie().then((randomMovie) => {
      setMovie(randomMovie)
      setIsLoading(false)
    })
  }, [])

  async function handleRefresh() {
    setIsLoading(true)

    const randomMovie = await getRandomMovie()

    setMovie(randomMovie)
    setIsLoading(false)
  }

  if (!movie) {
    return <main>Загрузка...</main>
  }

  return (
    <main>
      <MovieHero
        movie={movie}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      <TopMovies />
    </main>
  )
}