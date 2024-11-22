import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

export interface Country {
  id: number;
  country: string;
  participations: Participation[];
}

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  
  // BehaviorSubject holds the latest data
  // $ : naming convention that indicates an observable or observable-like
  
  //Original
  //private olympics$ = new BehaviorSubject<any>(undefined);
  
  //Modified
  private olympics$ = new BehaviorSubject<Country[] | null>(null);

  

  constructor(private http: HttpClient) {}

 

  // Fetch data: 
  // HTTP GET request to the json/url
  // Returns an Observable when the HTTP request is successful
  // Response type is "any": needs to be given a type later
  // .pipe() chains RxJS operators to process data or handle errors: 
  // if request succeeds, calls tap(), otherwise it calls catchError()
  // .tap(): perform actions on emitted values without changing them, here it passes the value to next()
  //.catchError(): handling error that occur during the data stream
  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  // returns an Observable for Observers to suscribe to
  getOlympics() {
    return this.olympics$.asObservable();
  }
}
