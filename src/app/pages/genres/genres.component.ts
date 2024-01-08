import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Genre, Movie } from '../../types/movie'
import { MoviesService } from '../../services/movies.service'
import { CommonModule } from '@angular/common'
import { ShowItemComponent } from '../../components/show-item/show-item.component'
import { PaginatorModule } from 'primeng/paginator'
import { ActivatedRoute, RouterModule } from '@angular/router'

@Component({
    selector: 'app-genres',
    standalone: true,
    imports: [CommonModule, ShowItemComponent, PaginatorModule, RouterModule],
    templateUrl: './genres.component.html',
    styleUrl: './genres.component.scss',
})
export class GenresComponent implements OnInit {
    genres$: Observable<Genre[]> | null = null
    shows$: Observable<Movie[]> | null = null
    genreId = ''
    // showsList$: Observable<MoviesDto> | null = null
    // searchValue = ''

    constructor(
        private movieService: MoviesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.genreId = params['genreId']
            this.shows$ = this.movieService.getMoviesByGenre(this.genreId)
        })
        this.genreId = this.route.snapshot.params['genreId']
        this.genres$ = this.movieService.getMoviesGenres()
        console.log(this.shows$)
    }

    findByGenre(genreId: string) {
        this.shows$ = this.movieService.getMoviesByGenre(genreId)
    }

    // getPagedShows(page: number, searchKeyword?: string) {
    //     this.showsList$ = this.movieService.searchMovie(page, searchKeyword)
    // }
    // onPageChange(event: PaginatorState) {
    //     const pageNumber = event.page ? event.page + 1 : 1
    //     this.getPagedShows(pageNumber + 1, this.searchValue)
    // }
}
