import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Movie, MoviesDto } from '../types/movie'
import { map } from 'rxjs'
import { VideosDto } from '../types/video'
import { ImagesDto } from '../types/images'
@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private baseUrl = 'https://api.themoviedb.org/3'
    private apiKey = '75ba8389c08886874de2701f4cd52c2d'

    constructor(private http: HttpClient) {}

    getMoviesByType(type: string, count = 20) {
        return this.http
            .get<MoviesDto>(
                `${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`
            )
            .pipe(map((data) => data.results.slice(0, count)))
    }
    getMoviesById(id: string) {
        return this.http.get<Movie>(
            `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
        )
    }

    getMovieVideos(id: string) {
        return this.http
            .get<VideosDto>(
                `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`
            )
            .pipe(map((data) => data.results))
    }
    getMovieImages(id: string) {
        return this.http
            .get<ImagesDto>(
                `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`
            )
            .pipe(map((data) => data.backdrops))
    }
}
