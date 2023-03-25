import { Component, OnInit } from '@angular/core';
import { Genres } from '../../models/genres';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  genres: Genres[] = [];

  constructor(private moviesServies: MoviesService) {}

  ngOnInit() {
    this.moviesServies.getGenres().subscribe((genresData) => {
      this.genres = genresData;
    });
  }
}
