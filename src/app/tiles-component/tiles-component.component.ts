import { Component, HostListener, OnInit } from '@angular/core';
import {
  calculatePoint,
  generateField,
  hexTransition,
  State,
} from '../helpers/tile.helper';

@Component({
  selector: 'app-tiles-component',
  templateUrl: './tiles-component.component.html',
  styleUrls: ['./tiles-component.component.css'],
})
export class TilesComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  field = generateField(12);

  currentState = State.hex;

  @HostListener('document:keyup', ['$event.target', '$event'])
  keydown(element: Element, event: KeyboardEvent) {
    const { key } = event;
    const point = calculatePoint(this.selectedPoint, this.currentState);
    this.currentState = hexTransition(key, this.currentState);
    if (key == 'w') {
      this.selectedPoint.y--;
    }
    if (key == 's') {
      this.selectedPoint.y++;
    }
    if (key == 'a') {
      this.selectedPoint.x--;
    }
    if (key == 'd') {
      this.selectedPoint.x++;
    }
    console.log(this.selectedPoint);
  }

  selectedPoint = {
    x: 0,
    y: 0,
  };
}
