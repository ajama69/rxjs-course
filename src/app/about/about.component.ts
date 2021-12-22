import { Component, OnInit } from '@angular/core';
import { fromEvent, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const interval$ = timer(3000, 1000);

    console.log('start test');
    interval$.subscribe(val => console.log('stream 1 ' + val));

    const click$ = fromEvent(document, 'click');
    click$.subscribe((evt => { console.log(evt); }));
  }

}
