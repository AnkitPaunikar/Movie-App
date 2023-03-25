import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Movie,
  MovieCredits,
  MovieDto,
  MovieImages,
  MovieVideoDto,
} from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genres';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  #baseUrl: string = 'https://api.themoviedb.org/3';
  #apiKey: string = '06f85fcac44129b389eee110661c495a';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'popular', count: number = 12) {
    return this.http
      .get<MovieDto>(`${this.#baseUrl}/movie/${type}?api_key=${this.#apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(
      `${this.#baseUrl}/movie/${id}?api_key=${this.#apiKey}`
    );
  }

  getMoviesVideo(id: string) {
    return this.http
      .get<MovieVideoDto>(
        `${this.#baseUrl}/movie/${id}/videos?api_key=${this.#apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(
        `${this.#baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${
          this.#apiKey
        }`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(
      `${this.#baseUrl}/movie/${id}/images?api_key=${this.#apiKey}`
    );
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this.#baseUrl}/movie/${id}/credits?api_key=${this.#apiKey}`
    );
  }

  getGenres() {
    return this.http
      .get<GenresDto>(
        `${this.#baseUrl}/genre/movie/list?api_key=${this.#apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getMovieByGenres(genresId: string, page: number) {
    return this.http
      .get<MovieDto>(
        `${
          this.#baseUrl
        }/discover/movie?with_genres=${genresId}&page=${page}&api_key=${
          this.#apiKey
        }`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
