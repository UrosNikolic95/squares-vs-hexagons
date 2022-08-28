import { Component, HostListener, OnInit } from '@angular/core';
import {
  calculatePoint,
  generateField,
  hexTransition,
  reversePoint,
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
    this.currentState = hexTransition(key, this.currentState);
    this.selectedPoint = calculatePoint(this.selectedPoint, this.currentState);
    if (key == 'w' || key == 'y') {
      this.selectedPoint.y--;
    }
    if (key == 's' || key == 'h') {
      this.selectedPoint.y++;
    }
    if (key == 'a' || key == 'g') {
      this.selectedPoint.x--;
    }
    if (key == 'd' || key == 'j') {
      this.selectedPoint.x++;
    }

    this.selectedPoint = reversePoint(this.selectedPoint, this.currentState);
  }

  selectedPoint = {
    x: 0,
    y: 0,
  };
}
