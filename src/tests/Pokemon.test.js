import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testes do Component Pokemon', () => {
  it('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const btnBug = screen.getByRole('button', { name: /bug/i });
      userEvent.click(btnBug);

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const imgPokemon = screen.getByAltText('Caterpie sprite');

      expect(pokemonName).toHaveTextContent('Caterpie');
      expect(pokemonType).toHaveTextContent('Bug');
      expect(pokemonWeight).toHaveTextContent('Average weight: 2.9 kg');
      expect(imgPokemon).toBeInTheDocument();
      expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
    });

  it(`Verifica se o card do Pokémon indicado na 
      Pokédex contém um link de navegação para exibir detalhes deste Pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkFavorite);

    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
