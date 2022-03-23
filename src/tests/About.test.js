import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../components';

describe('Testes do About', () => {
  it('Verifica se a page tem as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoAbout = screen.getByText(/this application simulates a Pokédex/i);

    expect(infoAbout).toBeInTheDocument();
  });

  it('Verifica se um h2 é renderizado com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const h2About = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(h2About).toBeInTheDocument();
  });

  it('Verifica se existem 2 parágrafos', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(
      /a digital encyclopedia containing all Pokémons/i,
    );

    const paragraph2 = screen.getByText(/and see more details for each one of them/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Verifica se a img pokedex está sendo renderizada', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
