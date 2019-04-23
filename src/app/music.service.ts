import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
// tslint:disable: indent
import { Observable } from 'rxjs';
import { HandlerService } from './handler.service';
import { AuthService } from '../app/auth.service';
import { SongSearch } from './models/song-search';

@Injectable({
	providedIn: 'root'
})
export class MusicService {
	// Put the url to server/tables here
	private url = 'http://localhost:3000';

	constructor(private http: HttpClient, public handler: HandlerService, public authService: AuthService) {}

	// crud operations

	public post(musicType): Observable<Object> {
		return this.http.post(this.url, musicType).pipe(
			tap((result) => {
				this.handler.log('UserService', `POST user`, {
					body: musicType,
					result: result
				});
			}),
			catchError(this.handler.error<any>('UserService::post'))
		);
	}

	public getMusic(params: any): Observable<SongSearch[]> {
		return this.http
			.get<SongSearch[]>(this.url, {
				headers: this.authService.getHeaders()
			})
			.pipe(
				map((results) => {
					this.handler.log('SockService', 'GET watchlist', {
						results: results
					});

					// Array-ify
					if (!(results instanceof Array)) {
						results = [ results ];
					}

					return results;
				}),
				catchError(this.handler.error<SongSearch[]>('UserService::getOne'))
			);
	}
}
