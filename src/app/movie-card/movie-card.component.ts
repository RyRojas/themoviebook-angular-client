import { Component, OnInit } from '@angular/core';
import { ApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

interface Movie {
  _id: string;
  Title: string;
  Description: string;
  Genre: Genre[];
  Director: Director;
  ImagePath: string;
  Year: string;
}

interface Genre {
  Name: string;
  Description: string;
}

interface Director {
  Name: string;
  Bio: string;
  Birth: Date;
  Death: Date;
}

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];
  favMovies: string[] = [];

  constructor(
    public fetchApiData: ApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMovies();
    this.getFavorites();
  }

  getMovies() {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getFavorites() {
    this.fetchApiData.getFavorites().subscribe((resp: any) => {
      this.favMovies = resp.Favorites;
    });
  }

  filterLocalFavorites(id: string, isPresent: boolean) {
    if (isPresent) {
      const movieIndex = this.favMovies.indexOf(id);
      movieIndex === -1 ? null : this.favMovies.splice(movieIndex, 1);
    } else {
      this.favMovies.push(id);
    }
  }

  toggleFavorite(id: string) {
    if (this.favMovies.includes(id)) {
      this.fetchApiData.deleteFavorite(id).subscribe(() => {
        this.filterLocalFavorites(id, true);
      });
    } else {
      this.fetchApiData.addFavorite(id).subscribe(() => {
        this.filterLocalFavorites(id, false);
      });
    }
  }

  openDirectorCard(director: Director) {
    const convertedDirector = {
      name: director.Name,
      bio: director.Bio,
      birth: new Date(director.Birth).toLocaleDateString(),
      death: director.Death
        ? new Date(director.Death).toLocaleDateString()
        : '',
    };

    this.dialog.open(DirectorCardComponent, {
      data: convertedDirector,
    });
  }

  openGenreCard(genres: Genre[]) {
    this.dialog.open(GenreCardComponent, {
      data: genres,
    });
  }

  openSynopsisCard(synopsis: string) {
    this.dialog.open(SynopsisCardComponent, {
      data: synopsis,
    });
  }
}
