import { Component } from '@angular/core'
import { SliderComponent } from '../../components/slider/slider.component'
import { BannerComponent } from '../../components/banner/banner.component'
import { MoviesService } from '../../services/movies.service'
import { TvshowsService } from '../../services/tvshows.service'
import { CommonModule } from '@angular/common'
import { mapToMovies } from '../../types/tvshow'
import { map } from 'rxjs'
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SliderComponent, BannerComponent, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    upcomingMovies$ = this.moviesService.getMoviesByType('upcoming', 12)
    popularMovies$ = this.moviesService.getMoviesByType('popular', 12)
    topRatedMovies$ = this.moviesService.getMoviesByType('top_rated', 12)
    popularTvshows$ = this.tvshowsService
        .getTvshowsByType('popular', 12)
        .pipe(map(mapToMovies))
    constructor(
        private moviesService: MoviesService,
        private tvshowsService: TvshowsService
    ) {}
}
