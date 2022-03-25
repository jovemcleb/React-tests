import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../components';

describe('Testes do Component NotFound', () => {
  it('Verifica se a msg de NotFound é renderizada', () => {
    renderWithRouter(<NotFound />);
    const h2NotFound = screen.getByRole(
      'heading', { name: /Page requested not found/i, level: 2 },
    );
    expect(h2NotFound).toBeInTheDocument();
  });

  it('Verifica se a img do pikachu é renderizada', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );

    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
