import { Component, OnInit } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../model/course';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {

      const http$: Observable<Object> = createHttpObservable('/api/courses');

      const courses$: Observable<Course[]> = http$
        .pipe(
          map(res => res['payload'])
        );

      // Reactive Design
      this.beginnerCourses$ = courses$
        .pipe(
          map(courses => courses
            .filter(course => course.category === 'BEGINNER'))
        );

      this.advancedCourses$ = courses$
        .pipe(
          map(courses => courses
            .filter(course => course.category === 'ADVANCED'))
        );

    }

}
