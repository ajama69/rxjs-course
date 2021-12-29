import { Observable } from 'rxjs';

/**
 * createHttpObservable(string) returns an Observable of type Object
 *
 * @param url
 */
export function createHttpObservable(url: string): Observable<Object> {
  return Observable.create(observer => {

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
