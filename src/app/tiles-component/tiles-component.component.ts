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
  sleep,
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
  async keyup(event: KeyboardEvent) {
    const { key } = event;
    this.currentState = hexTransition(key, this.currentState);
    const point = calculatePoint(this.selectedPoint, this.currentState);
    if (key == 'w' || key == 'y') {
      point.y--;
    }
    if (key == 's' || key == 'h') {
      point.y++;
    }
    if (key == 'a' || key == 'g') {
      point.x--;
    }
    if (key == 'd' || key == 'j') {
      point.x++;
    }
    if (adjancy[pointToString(point)] || ['y', 'h', 'g', 'j'].includes(key))
      this.selectedPoint = reversePoint(point, this.currentState);

    this.tiles.forEach((el) =>
      el.keyup(event, this.currentState, this.selectedPoint)
    );
    this.positionRegistration();

    this.movedRegistration();
    if (this.moved.length) {
      console.log('moved');
      await sleep(200);

      await Promise.all(
        this.moved.map(async (el) => {
          const oldColor = el.color;
          el.color = 'yellow';
          await sleep(200);
          el.color = oldColor;
        })
      );

      let group: SingleTileComponentComponent[] = [...this.moved];
      for (let i1 = 0; i1 < 30; i1++) {
        const points = [...group];
        const startingPoint = this.pickRandom(points);
        console.log('group.length', group.length, !!startingPoint);
        if (startingPoint) {
          group = this.takeGroup(startingPoint);
          await Promise.all(
            group.map(async (el) => {
              const oldColor = el.color;
              el.color = 'yellow';
              await sleep(200);
              el.color = pickRandomColour();
            })
          );
        }
      }
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

  pickRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  takeGroup(
    startingPoint: SingleTileComponentComponent,
    visited = new Set<SingleTileComponentComponent>()
  ) {
    if (!startingPoint) return startingPoint;

    visited.add(startingPoint);
    const queue = [startingPoint];
    const found = [startingPoint];
    while (queue.length) {
      const current = queue.shift();
      if (!current) break;
      const adjacentPoints = this.getAdjacent(current.point);
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
    return moveBy
      .map((moveByPoint) =>
        this.getTileFromPosition(
          calculatePoint(point, this.currentState),
          moveByPoint
        )
      )
      .filter((el) => el);
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

  func(str: string) {
    console.log(str);
  }
}
