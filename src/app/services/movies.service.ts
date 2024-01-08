import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { GenresDto, Movie, MoviesDto } from '../types/movie'
import { map } from 'rxjs'
import { VideosDto } from '../types/video'
import { ImagesDto } from '../types/images'
import { CreditsDto } from '../types/credits'
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
    getMovieCast(id: string) {
        return this.http
            .get<CreditsDto>(
                `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
            )
            .pipe(map((data) => data.cast))
    }
    searchMovie(page: number, searchValue?: string) {
        const uri = searchValue
            ? `search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${page}`
            : `movie/popular?page=${page}`
        return this.http.get<MoviesDto>(
            `${this.baseUrl}/${uri}&api_key=${this.apiKey}`
        )
    }

    getMoviesGenres() {
        return this.http
            .get<GenresDto>(
                `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`
            )
            .pipe(map((data) => data.genres))
    }

    getMoviesByGenre(genreId: string, pageNumber?: number) {
        return this.http
            .get<MoviesDto>(
                `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
            )
            .pipe(
                map((data) => {
                    return data.results
                })
            )
    }
}
