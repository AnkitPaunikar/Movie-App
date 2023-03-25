import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genresId: string | null = null;
  searchValue: string | null = null;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genresId }) => {
      if (genresId) {
        this.genresId = genresId;
        this.getMoviesByGenres(genresId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService
      .searchMovies(page, searchKeyword)
      .subscribe((movie) => (this.movies = movie));
  }

  getMoviesByGenres(genresId: string, page: number) {
    this.moviesService
      .getMovieByGenres(genresId, page)
      .subscribe((movie) => (this.movies = movie));
  }

  paginate(event: any) {
    if (this.genresId) {
      this.getMoviesByGenres(this.genresId, event.page + 1);
    } else if (this.searchValue) {
      this.getPagedMovies(event.page + 1, this.searchValue);
    } else {
      this.getPagedMovies(event.page + 1);
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
