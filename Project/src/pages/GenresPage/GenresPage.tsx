import { useEffect, useState } from 'react'
import { getGenres } from '../../api/movies'
import { GenreCard } from '../../components/GenreCard/GenreCard'
import type { Genre } from '../../types/Genre'
import { createGenres } from '../../utils/genres'
import './GenresPage.css'

export function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    getGenres().then((genreNames) => {
      setGenres(createGenres(genreNames))
    })
  }, [])

  return (
    <main>
      <h1 className="genres-title">Жанры фильмов</h1>

      <div className="genres-grid">
        {genres.map((genre) => (
          <GenreCard key={genre.name} genre={genre} />
        ))}
      </div>
    </main>
  )
}