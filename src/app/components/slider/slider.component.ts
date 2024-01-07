import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { state, trigger, style, transition, animate } from '@angular/animations'
import { imageBaseUrl } from '../../constants/images-sizes'
import { Movie } from '../../types/movie'

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
    @Input() slides: Movie[] = []
    @Input() isHeader = false

    constructor() {}

    slideIndex = 0

    imagesBaseUrl = imageBaseUrl

    ngOnInit(): void {
        if (!this.isHeader) {
            this.changeSlide()
        }
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
