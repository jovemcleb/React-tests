import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testes de Favirite Pokemons', () => {
  it(
    `Verifica se a mensagem:
    "No favorite pokemon found" é exibida se não houver pokémons favoritos`, () => {
      renderWithRouter(<FavoritePokemons />);

      const noFound = screen.getByText(/no favorite pokemon found/i);

      expect(noFound).toBeInTheDocument();
    },
  );

  it('Verifica se os pokémons favoritos são exibidos', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const checkPokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkPokemon);

    history.push('/favorites');
    const pokemon = screen.getByAltText(/is marked as favorite/i);
    expect(pokemon).toBeInTheDocument();
  });
});
