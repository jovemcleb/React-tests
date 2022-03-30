import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do component Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Verifica se o h2 com "Encountred Pokémons" é renderizado', () => {
    const h2Home = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2,
    });

    expect(h2Home).toBeInTheDocument();
  });

  it('Verifica se o proximo pokemon é exibido quando o button é clicado', () => {
    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const pokemon = screen.getByTestId('pokemon-name');

    expect(pokemon).toHaveTextContent('Charmander');

    userEvent.click(btnNextPokemon);
    expect(pokemon).toHaveTextContent('Caterpie');
  });

  it('Verifica se é exibido um pokemon por vez', () => {
    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    const pokemon = screen.getAllByTestId('pokemon-name');

    userEvent.click(btnNextPokemon);
    expect(pokemon).toHaveLength(1);
    userEvent.click(btnNextPokemon);
    expect(pokemon).toHaveLength(1);
  });

  it('Verifica se a Pokedex tem botões de filtro', () => {
    const typesBtn = screen.getAllByTestId('pokemon-type-button');
    const typesOfPokemons = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];

    typesBtn.forEach((type, index) => {
      expect(type).toHaveTextContent(typesOfPokemons[index]);
    });
  });

  it(`Verifica se a partir da seleção de um botão de tipo, 
    a Pokédex deve circular somente pelos pokémons daquele tipo`, () => {
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const btnFire = screen.getByRole('button', { name: 'Fire' });
    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    const type = screen.getByTestId('pokemon-type');

    userEvent.click(btnFire);
    expect(type).toHaveTextContent('Fire');
    userEvent.click(btnNextPokemon);
    expect(type).toHaveTextContent('Fire');

    userEvent.click(btnPsychic);
    expect(type).toHaveTextContent('Psychic');
    userEvent.click(btnNextPokemon);
    expect(type).toHaveTextContent('Psychic');
  });

  it('Verifica se ao clicar no botão All os pokemons são mostrados sem filtro', () => {
    const btnAll = screen.getByRole('button', { name: /all/i });
    const pokemonName = screen.getByTestId(/pokemon-name/);
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(btnAll);
    expect(pokemonName).toHaveTextContent('Pikachu');
    const newPokemons = pokemons.filter(({ name }) => name !== 'Pikachu');
    newPokemons.forEach(({ name }) => {
      userEvent.click(btnNextPokemon);
      expect(pokemonName).toHaveTextContent(name);
    });
  });
});
