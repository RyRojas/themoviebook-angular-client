import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Genre {
  Name: string;
  Description: string;
}

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss'],
})
export class GenreCardComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public genres: Array<Genre>
  ) {}

  ngOnInit(): void {}
}
