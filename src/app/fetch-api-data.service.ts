import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

const apiUrl = 'https://the-moviebook.herokuapp.com';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //Inject the HttpClient module to the constructor params
  //This wiill provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  //API call for user login
  //Expects userDetails in params
  //Returns HTTP response
  public loginUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /***********
  USER ENDPOINTS
  ***********/

  //API call for user registration
  //Expects userDetails object in body
  //Returns HTTP response
  public registerUser(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  //API call for retrieving user by username
  //Expects auth header
  //Returns JSON object with data for specified user
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .get(`${apiUrl}/users/${user}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API call for editing user info
  //Expects body object featuring fields to update and auth header
  //Returns plain text confirmation
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .put(`${apiUrl}/users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //API call for deleting user
  //Expects auth header
  //Returns plain text confirmation
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .delete(`${apiUrl}/users/${user}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /***
  User Favorites
  ***/

  //API call for retrieving user favorites
  //Expects auth header
  //Returns array of movie objects in JSON
  public getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .get(`${apiUrl}/users/${user}/favs`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API call for adding movie to user favorites
  //Expects movieID in body + auth header
  //Returns plain text confirmation
  public addFavorite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .post(
        `${apiUrl}/users/${user}/favs`,
        { movieID: movieID },
        { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      )
      .pipe(catchError(this.handleError));
  }

  //API call for deleting movie from user favorites
  //Expects movieID in body + auth header
  //Returns plain text confirmation
  public deleteFavorite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .delete(`${apiUrl}/users/${user}/favs/${movieID}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  /***********
  MOVIE ENDPOINTS
  ***********/

  //API call for retrieving all movies
  //Requires auth token in header
  //Returns HTTP response with array of movies in body
  public getMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API call for retrieving all movies
  //Requires title in url and auth token in header
  //Returns HTTP response with array of movies in body
  public getMoviesByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /***********
  GENRE ENDPOINT
  ***********/

  //API call for retrieving genre by name
  //Requires genre in url and auth token in header
  //Returns HTTP response with genre data in body
  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}/genres/${genre}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /***********
  DIRECTOR ENDPOINT
  ***********/

  //API call for retrieving director by name
  //Requires director name in url and auth token in header
  //Returns HTTP response with director data in body
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}/genres/${director}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /******
   *
   * Reusable functions
   *
   ******/
  private extractResponseData(res: Response | {}): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }

    return throwError('Something went wrong. Please try again later.');
  }
}
