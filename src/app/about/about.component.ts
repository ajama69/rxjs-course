import { Component, OnInit } from '@angular/core';
import { interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      const http$ = createHttpObservable('/api/courses');

      const sub = http$.subscribe(console.log);

      // depending on the local machine (cpu speed) timeout has to be increased.
      // timeout '0' didn't work for me... unsubscribe started too early.
      setTimeout(() => sub.unsubscribe(), 10);

  }

}
