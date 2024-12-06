import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Country } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieGraphComponent } from 'src/app/pie-graph/pie-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PieGraphComponent, NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Country[] | null> = of(null);
  private olympicsSubscription!: Subscription;
  public totalCountries!: number;
  public totalOlympicGames!: number;
  public totalMedalsByCountry: { name: string; value: number; }[] = [];
  public MedalsPerYear: { name: string; series: { name: string; value: number }[] }[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData(); // Load the data when the component initializes
    // subscribe to the observable create by calling getOlympics
    this.olympicsSubscription = this.olympicService.getOlympics().subscribe((data) => {
      // of(): Emit variable amount of values in a sequence and then emits a complete notification.
      this.olympics$ = of(data);
      this.calculateTotalCountries(data);
      this.calculateTotalOlympicGames(data);
      this.calculateMedalsByCountry(data);
      this.calculateMedalsPerYear(data); 
    });
  }

  // Unsubscribe when the component is destroyed
  ngOnDestroy(): void {
    if (this.olympicsSubscription) {
      this.olympicsSubscription.unsubscribe(); 
    }
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

  calculateMedalsByCountry(countries: Country[] | null): void {
    if (countries) {
      // Create the transformed array in the desired format
      this.totalMedalsByCountry = countries.map((country) => {
        let totalMedals = 0;

        // Calculate the total medals for the current country
        country.participations.forEach((participation) => {
          totalMedals += participation.medalsCount;
        });

        // Return the object in the desired format
        return {
          name: country.country,
          value: totalMedals,
        };
      });
    } else {
      // If no countries are provided, reset the array
      this.totalMedalsByCountry = [];
    }
  }

  // For each country, find the numbers of medals won each year  
  // To be passed to Details component
  private calculateMedalsPerYear(countries: Country[] | null): void {
    if (countries) {
      this.MedalsPerYear = countries.map((country) => ({
        name: country.country,
        series: country.participations.map((participation) => ({
          name: participation.year.toString(),
          value: participation.medalsCount,
        })),
      }));
    } else {
      this.MedalsPerYear = [];
    }
  }

  

}
