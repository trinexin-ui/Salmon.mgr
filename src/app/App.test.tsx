import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from './App'

it('renders the home screen of the prototype', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByText('81 of 100 approved')).toBeInTheDocument()
  expect(screen.getByText('Jose Reyes')).toBeInTheDocument()
})
