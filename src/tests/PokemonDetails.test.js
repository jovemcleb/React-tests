import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testes para o Componente Pokemon Details', () => {
  it('Verifica se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: 'More details' });

      history.push('/pokemons/78');
      expect(linkDetails).not.toBeInTheDocument();

      const pokemonName = screen.getByRole('heading',
        { name: 'Rapidash Details', level: 2 });
      expect(pokemonName).toBeInTheDocument();

      const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(summary).toBeInTheDocument();

      const resumoPokas = screen.getByText(/At full gallop, its four hooves barely/i);
      expect(resumoPokas).toBeInTheDocument();
    });

  it(`Verifica se existe na página uma seção 
  com os mapas contendo as localizações do pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/78');

    const h2Location = screen.getByRole('heading',
      { name: 'Game Locations of Rapidash', level: 2 });
    expect(h2Location).toBeInTheDocument();

    const imgLocation = screen.getAllByRole('img', { name: 'Rapidash location' });
    expect(imgLocation).toHaveLength(2);
    expect(imgLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png');
    expect(imgLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png');

    const locationOne = screen.getByText('Kanto Route 28');
    const locationTwo = screen.getByText('Johto Mount Silver');
    expect(locationOne && locationTwo).toBeInTheDocument();
  });

  it('Verifica se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pokemons/25');
      const linkFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
      expect(linkFavorite).toBeInTheDocument();

      userEvent.click(linkFavorite);
      const starFavorite = screen.getByRole('img',
        { name: 'Pikachu is marked as favorite' });
      expect(starFavorite).toBeInTheDocument();

      userEvent.click(linkFavorite);
      expect(starFavorite).not.toBeInTheDocument();
    });
});
