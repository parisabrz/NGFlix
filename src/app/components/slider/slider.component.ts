import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MoviesService } from '../../services/movies.service'
import { state, trigger, style, transition, animate } from '@angular/animations'
import { imageBaseUrl } from '../../constants/images-sizes'

@Component({
    selector: 'app-slider',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss',
    animations: [
        trigger('slideFade', [
            state('void', style({ opacity: 0 })),
            transition('void <=> *', [animate('1s')]),
        ]),
    ],
})
export class SliderComponent implements OnInit {
    constructor(private movieService: MoviesService) {}
    movies$ = this.movieService.getPopularMovies()

    slideIndex = 0

    imagesBaseUrl = imageBaseUrl

    ngOnInit(): void {
        this.changeSlide()
    }

    changeSlide() {
        setInterval(() => {
            this.slideIndex += 1
            if (this.slideIndex > 10) {
                this.slideIndex = 0
            }
        }, 5000)
    }
}
