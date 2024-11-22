import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService, Country } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Country[] | null> = of(null);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData(); // Load the data when the component initializes
    // subscribe to the observable create by calling getOlympics
    this.olympicService.getOlympics().subscribe((data) => {
      // of(): Emit variable amount of values in a sequence and then emits a complete notification.
      this.olympics$ = of(data);
    });
  }
}

/* export class HomeComponent implements OnInit {
  public olympics$: Observable<Country[] | null> = of(null);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
} */
