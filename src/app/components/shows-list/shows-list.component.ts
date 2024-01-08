import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { MoviesDto } from '../../types/movie'
import { MoviesService } from '../../services/movies.service'
import { CommonModule } from '@angular/common'
import { ShowItemComponent } from '../show-item/show-item.component'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'
import { PaginatorModule, PaginatorState } from 'primeng/paginator'
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-shows-list',
    standalone: true,
    imports: [
        CommonModule,
        ShowItemComponent,
        InputTextModule,
        FormsModule,
        PaginatorModule,
    ],
    templateUrl: './shows-list.component.html',
    styleUrl: './shows-list.component.scss',
})
export class ShowsListComponent implements OnInit {
    showsList$: Observable<MoviesDto> | null = null
    searchValue = ''
    showType: 'movie' | 'tv' = 'movie'

    constructor(
        private movieService: MoviesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.showType = this.route.snapshot.params['type']
        this.getPagedShows(1)
    }

    getPagedShows(page: number, searchKeyword?: string) {
        this.showsList$ = this.movieService.searchMovie(page, searchKeyword)
    }
    searchChanged() {
        this.getPagedShows(1, this.searchValue)
    }

    onPageChange(event: PaginatorState) {
        const pageNumber = event.page ? event.page + 1 : 1
        this.getPagedShows(pageNumber + 1, this.searchValue)
    }
}
