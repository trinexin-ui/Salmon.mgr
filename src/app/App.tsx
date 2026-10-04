import { Link, Route, Routes } from 'react-router-dom'
import { StyleGuide } from '@/style-guide/StyleGuide'

function Home() {
  return (
    <main className="mx-auto max-w-md p-l">
      <h1 className="type-h1 text-text-and-icon-primary">Salmon Manager</h1>
      <Link to="/style-guide" className="type-body_1 text-project-green mt-m block cursor-pointer">
        → Style guide
      </Link>
    </main>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/style-guide" element={<StyleGuide />} />
    </Routes>
  )
}
