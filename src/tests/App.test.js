import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do App.js', () => {
  it('Verifica se os links de navegação estão sendo exibidos', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link "Home", o endereço URL é: "/"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const h2Home = screen.getByRole('heading', { name: /encountered/i, level: 2 });
    expect(history.location.pathname).toBe('/');
    expect(h2Home).toBeDefined();
  });

  it('Verifica se ao clicar em "About", a page é redirecionada para "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const h2About = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(history.location.pathname).toBe('/about');
    expect(h2About).toBeInTheDocument();
  });

  it('Se ao clicar em "Favorite Pokémons", a rota é renderizada corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);

    const h2Favorite = screen.getByRole(
      'heading', { name: 'Favorite pokémons', level: 2 },
    );

    expect(history.location.pathname).toBe('/favorites');
    expect(h2Favorite).toBeInTheDocument();
  });

  it('Se a url for desconhecida a page renderiza "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/test');
    console.log(history);

    const h2NotFound = screen.getByRole(
      'heading', { name: /Page requested not found/i, level: 2 },
    );

    expect(history.location.pathname).toEqual('/test');
    expect(h2NotFound).toBeInTheDocument();
  });
});
