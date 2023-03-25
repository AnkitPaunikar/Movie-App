import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  constructor(private moviesServie: MoviesService) {}

  ngOnInit(): void {
    this.moviesServie.getMovies('popular').subscribe((movie) => {
      this.popularMovies = movie;
    });
    this.moviesServie.getMovies('upcoming').subscribe((movie) => {
      this.upcomingMovies = movie;
    });
    this.moviesServie.getMovies('top_rated').subscribe((movie) => {
      this.topRatedMovies = movie;
    });
  }
}
