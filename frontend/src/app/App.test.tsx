import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the frontend starter heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Frontend starter' }),
    ).toBeInTheDocument()
  })
})
