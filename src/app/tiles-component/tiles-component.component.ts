import { Component, OnInit } from '@angular/core';
import { generateFIeld } from '../helpers/tile.helper';

@Component({
  selector: 'app-tiles-component',
  templateUrl: './tiles-component.component.html',
  styleUrls: ['./tiles-component.component.css'],
})
export class TilesComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  field = generateFIeld(3);
}
