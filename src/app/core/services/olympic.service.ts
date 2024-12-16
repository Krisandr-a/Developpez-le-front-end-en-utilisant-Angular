import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[] | null>(null);


  constructor(private http: HttpClient,
    private router: Router
  ) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error('Error loading Olympics data', error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        this.router.navigate(['/404']);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
  
}
