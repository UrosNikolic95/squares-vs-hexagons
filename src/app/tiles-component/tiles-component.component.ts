import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import {
  adjancy,
  calculatePoint,
  generateField,
  hexTransition,
  IPoint,
  pickRandomColour,
  pointToString,
  reversePoint,
  State,
} from '../helpers/tile.helper';
import { SingleTileComponentComponent } from '../single-tile-component/single-tile-component.component';

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

    this.positionRegistration();
    this.movedRegistration();
    if (this.moved.length) {
      setTimeout(() => {
        const group = this.takeGroup();
        console.log('?', group, this.moved);
        console.log('group', group.length);
        group.forEach((el) => {
          const oldColor = el.color;
          el.color = 'yellow';
          setTimeout(() => (el.color = oldColor), 500);
        }, 500);
      });
    }
  }

  tiles: SingleTileComponentComponent[] = [];
  moved: SingleTileComponentComponent[] = [];

  visited = new Set<SingleTileComponentComponent>();

  positionRegistration() {
    Object.keys(adjancy).forEach((key) => delete adjancy[key]);
    this.tiles.forEach((tile) => {
      adjancy[pointToString(calculatePoint(tile.point, this.currentState))] =
        tile;
    });
  }

  movedRegistration() {
    this.moved = this.tiles.filter((el) => el.moved);
  }

  pickRandomMoved() {
    return this.moved[Math.floor(Math.random() * this.moved.length)];
  }

  takeGroup() {
    const startingPoint = this.pickRandomMoved();

    const visited = new Set<SingleTileComponentComponent>();
    visited.add(startingPoint);
    const queue = [startingPoint];
    const found = [startingPoint];
    while (queue.length) {
      const current = queue.shift();
      if (!current) break;
      const adjacentPoints = this.getAdjacent(current.point);
      console.log(adjacentPoints);
      adjacentPoints.forEach((el) => {
        if (!visited.has(el) && el.color == startingPoint.color) {
          visited.add(el);
          queue.push(el);
          found.push(el);
        }
      });
    }
    return found;
  }

  getAdjacent(point: IPoint) {
    const moveBy: IPoint[] = [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: -1,
      },
      {
        x: -1,
        y: 0,
      },
    ];
    return moveBy.map((moveByPoint) =>
      this.getTileFromPosition(
        calculatePoint(point, this.currentState),
        moveByPoint
      )
    );
  }

  getTileFromPosition(point: IPoint, moveBy: IPoint) {
    const next = {
      x: point.x + moveBy.x,
      y: point.y + moveBy.y,
    };
    return adjancy[pointToString(next)];
  }

  selectedPoint = {
    x: 0,
    y: 0,
  };
}
