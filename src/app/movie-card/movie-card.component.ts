import { Component, OnInit } from '@angular/core';
import { ApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorCardComponent } from '../director-card/director-card.component';

interface Movie {
  _id: string;
  Title: string;
  Description: string;
  Genre: Array<{
    Name: string;
    Description: string;
  }>;
  Director: {
    Name: string;
    Bio: string;
    Birth: Date;
    Death: Date;
  };
  ImagePath: string;
  Year: string;
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

  openDirectorCard(name: string, bio: string, birth: Date, death: Date) {
    const birthDate = new Date(birth).toLocaleDateString(),
      deathDate = death ? new Date(death).toLocaleDateString() : '';

    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birthDate, deathDate },
    });
  }
}
