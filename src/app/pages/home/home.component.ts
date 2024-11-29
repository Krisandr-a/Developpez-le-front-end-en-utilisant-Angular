import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Country[] | null> = of(null);
  public totalCountries!: number;
  public totalOlympicGames!: number;
  public totalMedalsByCountry: { [key: string]: number } = {};

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData(); // Load the data when the component initializes
    // subscribe to the observable create by calling getOlympics
    this.olympicService.getOlympics().subscribe((data) => {
      // of(): Emit variable amount of values in a sequence and then emits a complete notification.
      this.olympics$ = of(data);
      this.calculateTotalCountries(data);
      this.calculateTotalOlympicGames(data);
      this.calculateMedalsByCountry(data);
    });
    
  }

  private calculateTotalCountries(countries: Country[] | null): void {
    if (countries) {
      // Set the totalCountries count based on the number of countries in the array
      this.totalCountries = countries.length;
    } else {
      // If no countries data, set totalCountries to 0
      this.totalCountries = 0;
    }
  }

///
  private calculateTotalOlympicGames(countries: Country[] | null): void {
    if (countries) {
      // Initialize the highest participation count to zero
      let maxParticipations = 0;

      // Iterate through the countries
      countries.forEach((country) => {
        // Count the number of participations for each country
        const participationCount = country.participations.length;

        // If the current country's participation count is greater than the previous max, update it
        if (participationCount > maxParticipations) {
          maxParticipations = participationCount;
        }
      });

      // Set the highestParticipationCount with the highest value found
      this.totalOlympicGames = maxParticipations;
    }
  }

  //
  calculateMedalsByCountry(countries: Country[] | null): void {
    if (countries) {
      // Iterate through each country
      countries.forEach((country) => {
        let totalMedals = 0;

        // Iterate over the participations of the current country
        country.participations.forEach((participation) => {
          // Add the medalsCount of each participation to the total
          totalMedals += participation.medalsCount;
        });

        // Set the country as the key and the totalMedals as the value in the medalsByCountry object
        this.totalMedalsByCountry[country.country] = totalMedals;
      });
    }
  }

  

}

/* export class HomeComponent implements OnInit {
  public olympics$: Observable<Country[] | null> = of(null);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
} */
