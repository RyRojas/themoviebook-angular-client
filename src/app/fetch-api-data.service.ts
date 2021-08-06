import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const apiUrl = 'https://the-moviebook.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //Inject the HttpClient module to the constructor params
  //This wiill provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * User Login
   * @param userDetails
   * @returns Plain text confirmation
   * @category Login
   */
  public loginUser(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /***********
  USER ENDPOINTS
  ***********/

  /**
   * User Registration
   * @param userDetails
   * @returns Plain text confirmation
   * @category User
   */
  public registerUser(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  //API call for retrieving user by username
  //Expects auth header
  //Returns JSON object with data for specified user

  /**
   * Get user
   * @returns User object
   * @category User
   */
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

  /**
   * Edit user info
   * @param userDetails All fields optional
   * @returns Plain text confirmation
   * @category User
   */
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

  /**
   * Delete user
   * @returns Plain text confirmation
   * @category User
   */
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

  /**
   * Get User Favorites
   * @returns Array of movie ids
   * @category Favorites
   */
  public getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http
      .get(`${apiUrl}/users/${user}/favs`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add Favorite
   * @param movieID Movie ID string
   * @returns Plain text confirmation
   * @category Favorites
   */
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

  /**
   * Delete Favorite
   * @param movieID Movie ID string
   * @returns Plain text confirmation
   * @category Favorites
   */
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

  /**
   * Get Movies
   * @returns Array of Movie Objects
   * @category Movies
   */
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

  /**
   * Get Movies by Title
   * @param title Title of movie
   * @returns Array of Movies with matching titles
   * @category Movies
   */
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

  /**
   * Get Genre
   * @param genre Name of genre
   * @returns Genre object
   * @category Genres
   */
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

  /**
   * Get Director
   * @param director Name of director
   * @returns Director object
   * @category Directors
   */
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

  /**
   * Extract Response Data
   * @param res Http Response
   * @returns Response body
   * @category Utils
   */
  private extractResponseData(res: Response | {}): any {
    const body = res;
    return body || {};
  }

  /**
   * Error Handler
   * @param error HttpErrorResponse
   * @returns Error
   * @category Utils
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else if (error.error.user === false) {
      return throwError('Incorrect username or password.');
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }

    return throwError('Something went wrong. Please try again later.');
  }
}
