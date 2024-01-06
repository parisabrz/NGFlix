import { Component } from '@angular/core'
import { SliderComponent } from '../../components/slider/slider.component'
import { BannerComponent } from '../../components/banner/banner.component'
import { MoviesService } from '../../services/movies.service'
import { CommonModule } from '@angular/common'
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SliderComponent, BannerComponent, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    upcomingMovies$ = this.moviesService.getUpcomingMovies()
    topRatedMovies$ = this.moviesService.getTopRatedMovies()
    constructor(private moviesService: MoviesService) {}
}
