import { Link } from 'react-router-dom'
import type { Genre } from '../../types/Genre'
import './GenreCard.css'

type GenreCardProps = {
  genre: Genre
}

export function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link
      className="genre-card"
      to={`/genres/${genre.name}`}
    >
      <div className="genre-card__image">
        {genre.imageUrl ? (
          <img src={genre.imageUrl} alt="" />
        ) : (
          <span>{genre.title}</span>
        )}
      </div>

      <h2 className="genre-card__title">{genre.title}</h2>
    </Link>
  )
}