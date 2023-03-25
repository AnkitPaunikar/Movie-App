import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { IMAGE_SIZES } from '../../constant/image-sizes';

@Component({
  selector: 'silder',
  templateUrl: './silder.component.html',
  styleUrls: ['./silder.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate('1s')]),
      transition('* => void', [animate('500ms')]),
    ]),
  ],
})
export class SilderComponent implements OnInit {
  @Input() items: Movie[] = [];
  @Input() isBanner: boolean = false;

  currentSlideIndex: number = 0;
  readonly imageSizes = IMAGE_SIZES;

  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 5000);
    }
  }
}
