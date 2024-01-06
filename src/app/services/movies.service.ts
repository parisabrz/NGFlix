import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MoviesDto } from '../types/movie'
@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private baseUrl = 'https://api.themoviedb.org/3'
    private apiKey = '75ba8389c08886874de2701f4cd52c2d'

    constructor(private http: HttpClient) {}

    getPopularMovies() {
        return this.http.get<MoviesDto>(
            `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
        )
    }
    getUpcomingMovies() {
        return this.http.get<MoviesDto>(
            `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`
        )
    }
    getTopRatedMovies() {
        return this.http.get<MoviesDto>(
            `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`
        )
    }
}
