import { Component, OnInit } from '@angular/core';
import { concat, interval, of } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // const source1$ = of('a', 'b', 'c');
    const source1$ = interval(1000);

    const source2$ = of('d', 'e', 'f');

    const source3$ = of('x', 'y', 'z');

    const result$ = concat(source1$, source2$, source3$);

    result$.subscribe(console.log);
  }

}
