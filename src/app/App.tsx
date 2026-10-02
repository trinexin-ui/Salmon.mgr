import { Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-xl font-semibold">Salmon Manager</h1>
    </main>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
