import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGE_SIZES } from '../../constant/image-sizes';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() itemData: Movie | null = null;
  imagesSizes = IMAGE_SIZES;
}
