import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TvshowsDto } from '../types/tvshow'
import { map } from 'rxjs'
@Injectable({
    providedIn: 'root',
})
export class TvshowsService {
    private baseUrl = 'https://api.themoviedb.org/3'
    private apiKey = '75ba8389c08886874de2701f4cd52c2d'

    constructor(private http: HttpClient) {}

    getTvshowsByType(type: string, count = 20) {
        return this.http
            .get<TvshowsDto>(
                `${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`
            )
            .pipe(map((data) => data.results.slice(0, count)))
    }
}
