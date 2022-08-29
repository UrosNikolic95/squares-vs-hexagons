import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Event } from '@angular/router';
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

  field = generateField(24);

  currentState = State.hex;

  @HostBinding('style.left.px')
  x = 0;
  @HostBinding('style.top.px')
  y = 0;

  panning = false;

  startingPanningPoint = {
    x: 0,
    y: 0,
  };

  startingPosition = {
    x: 0,
    y: 0,
  };

  @HostListener('contextmenu', ['$event'])
  contextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(event: MouseEvent) {
    if (event.button == 0) {
      this.panning = true;
      this.startingPanningPoint = {
        x: event.x,
        y: event.y,
      };
      this.startingPosition = {
        x: this.x,
        y: this.y,
      };
    }
    event.preventDefault();
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(event: MouseEvent) {
    this.panning = false;
  }

  @HostListener('mousemove', ['$event'])
  mouseMove(event: MouseEvent) {
    if (this.panning) {
      this.x = this.startingPosition.x + event.x - this.startingPanningPoint.x;
      this.y = this.startingPosition.y + event.y - this.startingPanningPoint.y;
    }
  }

  @HostListener('document:keyup', ['$event'])
  keydown(event: KeyboardEvent) {
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
