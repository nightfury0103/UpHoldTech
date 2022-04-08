import React from 'react'
import nock from 'nock'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BotAlert from './BotAlert'

test('testing', async () => {
  const url = '/price'

  const scope = nock('http://localhost:3001')
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get('/price')
    .reply(200, {
      data: {
        ask: '0.87742',
        bid: '0.87742',
        currency: 'EUR',
      },
    });
  render(<BotAlert />)

  fireEvent.change(screen.getByRole('select'))

  await waitFor(() => screen.getByText(/Currency Pair/))

  expect(screen.getByText(/Currency Pair/)).toHaveTextContent(/Currency Pair/)
})