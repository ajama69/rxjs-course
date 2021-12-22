import { Observable } from 'rxjs';

/**
 * createHttpObservable(string) returns an Observable of type Object
 *
 * @param url
 */
export function createHttpObservable(url: string) : Observable<Object> {
  return Observable.create(observer => {

    // Browser Fetch API
    fetch(url)
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
  });
}
