import { Observable } from 'rxjs';

/**
 * createHttpObservable(string) returns an Observable of type any
 *
 *     create is deprecated: use new Observable() instead:
 *     https://stackoverflow.com/questions/55539103/angular-create-is-deprecated-use-new-observable-instead
 *
 *     deprecated version:
 *     export function createHttpObservable(url: string): Observable<Object> {
 *       return Observable.create(observer => {
 *         [...]
 *       }
 *     }
 *
 *     new version: see below
 *
 *     see also: what's the correct way to create a typed Observable with RxJS?
 *               https://stackoverflow.com/questions/58758558/whats-the-correct-way-to-create-a-typed-observable-with-rxjs
 *
 * @param url
 */

export function createHttpObservable(url: string): Observable<any> {
  return new Observable<any>(observer => {

    const controller = new AbortController(); // AbortController is part of the fetch API
    const signal = controller.signal;         // signal is provided by the AbortController
                                              //   - signal = true: fetch requests is being cancelled by the browser

    // Browser Fetch API
    fetch(url, { signal })
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });

    return () => controller.abort();

  });
}
