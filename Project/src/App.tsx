import { Route, Routes } from 'react-router-dom'
import { AccountPage } from './pages/AccountPage/AccountPage'
import { GenrePage } from './pages/GenrePage/GenrePage'
import { GenresPage } from './pages/GenresPage/GenresPage'
import { HomePage } from './pages/HomePage/HomePage'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { Layout } from './components/Layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genre" element={<GenrePage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Layout>
  )
}

export default App