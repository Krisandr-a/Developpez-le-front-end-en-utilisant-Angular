import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  // BehaviorSubject holds the latest data
  // $ : naming convention that indicates an observable or observable-like
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
  
  findCountryDetails(name: string) {
    const countries = this.olympics$.getValue(); // Retrieve the current data from BehaviorSubject

    if (!countries) {
      console.error('Olympics data not loaded.');
      return null; // Return early if data isn't available
    }
  
    const country = countries.find((c) => c.country === name);
  
    if (!country) {
      console.error(`Country ${name} not found.`);
      return null;
    }
  
    const totalParticipations = country.participations.length;
    const totalMedals = country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
    const totalAthletes = country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
  
    return { totalParticipations, totalMedals, totalAthletes };
  }
  
}
