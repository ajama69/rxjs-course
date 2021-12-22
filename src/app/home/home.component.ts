import { Component, OnInit } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Course } from '../model/course';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses: Course[];
    advancedCourses: Course[];

    ngOnInit() {

      const http$ = createHttpObservable('/api/courses');

      const courses$ = http$
        .pipe(
          map(res => res['payload'])
        );

      // Imperative Design / RxJS Anti Pattern:
      //  - avoid a lot of logic in subscribe method
      //  - do not nest subscribe calls
      courses$.subscribe(
        courses => {
          console.log(courses);

          this.beginnerCourses = courses
            .filter(course => course.category === 'BEGINNER');

          this.advancedCourses = courses
            .filter(course => course.category === 'ADVANCED');

        },
        noop,
        () => console.log('completed')
      );

    }

}
