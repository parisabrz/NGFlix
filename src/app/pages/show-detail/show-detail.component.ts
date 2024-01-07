import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MoviesService } from '../../services/movies.service'
import { Observable } from 'rxjs'
import { Movie } from '../../types/movie'
import { CommonModule } from '@angular/common'
import { SliderComponent } from '../../components/slider/slider.component'
import { TabViewModule } from 'primeng/tabview'
import { IMAGES_SIZES } from '../../constants/images-sizes'
import { Video } from '../../types/video'
import { VideoEmbedComponent } from '../../components/video-embed/video-embed.component'
import { Image } from '../../types/images'
import { ImageModule } from 'primeng/image'
@Component({
    selector: 'app-show-detail',
    standalone: true,
    imports: [
        CommonModule,
        SliderComponent,
        TabViewModule,
        VideoEmbedComponent,
        ImageModule,
    ],
    templateUrl: './show-detail.component.html',
    styleUrl: './show-detail.component.scss',
})
export class ShowDetailComponent implements OnInit {
    showId = ''
    show$: Observable<Movie> | null = null
    imagesSizes = IMAGES_SIZES
    showVideos$: Observable<Video[]> | null = null
    showImages$: Observable<Image[]> | null = null
    constructor(
        private router: ActivatedRoute,
        private moviesService: MoviesService
    ) {}

    ngOnInit(): void {
        this.showId = this.router.snapshot.params['id']

        this.show$ = this.moviesService.getMoviesById(this.showId)

        this.showVideos$ = this.moviesService.getMovieVideos(this.showId)

        this.showImages$ = this.moviesService.getMovieImages(this.showId)
    }
}
