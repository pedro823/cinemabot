import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { flatten } from 'ramda';

const url = {
  movies: (page: number) =>
    `https://www.cinemark.com.br/sao-paulo/filmes/em-cartaz?pagina=${page}`,
  showtimes: (path: string) =>
    `https://www.cinemark.com.br${path}`,
};

const parseMovies = async (page: number) => {
  const movies: Movie[] = [];

  const html = await axios.get(url.movies(page));

  const $ = cheerio.load(html.data);
  const container = $('.movie-container');
  if (container.length > 0) {
    container.each((_, element) => {
      const details = $('.movie-details', element);
      const title = $('h3', details).text().trim();
      const path = $('a', details).attr('href');
      const rating = Number($('.rating-abbr', details).text().trim());
      const image = $('source', element).attr('srcset');
      movies.push({
        title, path, rating, image
      })
    });
  }

  return movies;
}

const getMovies = async () => {
  return flatten(await Promise.all([1, 2].map(parseMovies)));
}

const parseShowtimes = async (path: string) => {
  const showtimes = []
  
  const html = await axios.get(url.showtimes(path));

  const $ = cheerio.load(html.data);
  const theaters = $('.theater');
  if (theaters.length > 0) {
    theaters.each((_, element) => {
      // const details = $('.movie-details', element);
      // const title = $('h3', details).text().trim();
      // const path = $('a', details).attr('href');
      // const rating = Number($('.rating-abbr', details).text().trim());
      // const image = $('source', element).attr('srcset');
      // movies.push({
      //   title, path, rating, image
      // })

    });
  }

  return movies;
}

getMovies().then(movies => {
  console.log(movies)
  console.log(movies.length)
})
