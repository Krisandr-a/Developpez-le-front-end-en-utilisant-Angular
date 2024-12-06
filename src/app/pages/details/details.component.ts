import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, of } from 'rxjs';
import { Country } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineGraphComponent } from 'src/app/line-graph/line-graph.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgxChartsModule, LineGraphComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public countryName: string = '';
  public totalParticipations?: number = 0;
  public totalMedals?: number = 0;
  public totalAthletes?: number = 0;
  public countryMedals!: { name: string; series: { name: string; value: number; }[]; } | null;
  //from home component: what do I need here?
  public olympics$: Observable<Country[] | null> = of(null);
  public totalCountries!: number;
  public totalOlympicGames!: number;
  public totalMedalsByCountry: { name: string; value: number; }[] = [];
  public medalsPerYear: { name: string; series: { name: string; value: number }[] }[] = [];


  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) {}

  /* ngOnInit(): void {
    // Get the countryName from the route parameter
    this.countryName = this.route.snapshot.paramMap.get('countryName');
  }*/ 

    ngOnInit(): void {
      // Retrieve the country name from route parameters
      this.route.params.subscribe((params) => {
        const country = params['countryName']; // This is string | undefined
    
        if (!country) {
          console.error('Country parameter is missing.');
          return; // Exit early if the parameter is invalid
        }
    
        this.countryName = country; // Now we know this is a valid string
        this.loadCountryDetails();       
      });

      // Initalizing and subscribing to the Observable
      this.olympicService.loadInitialData();
      this.olympicService.getOlympics().subscribe((data) => {
        // of(): Emit variable amount of values in a sequence and then emits a complete notification.
        this.olympics$ = of(data);
        // returns an object in the correct format for an ngx-charts line graph
        this.calculatemedalsPerYear(data);
        console.log("medalsPerYear");
        console.log(this.medalsPerYear);
        // Iterates over ngx-charts object to find a specific country
        this.medalsForCountry(this.countryName);
        console.log("this.countryMedals");
        console.log(this.countryMedals);
        
      });
    }
    // Navigate back
    goBack() {
      this.router.navigate(['/']);  // Navigate to the Home component
    }

    // Calculating non-line graph details
    private loadCountryDetails(): void {
      this.olympicService.getOlympics().subscribe((countries) => {
        console.log('Loaded countries:', countries); // Debugging data
    
        if (!countries) {
          console.error('Olympics data not loaded yet.');
          return;
        }
    
        const country = countries.find((c) => c.country === this.countryName);
        console.log('Found country:', country); // Debugging country details
    
        if (country) {
          this.totalParticipations = country.participations.length;
          this.totalMedals = country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
          this.totalAthletes = country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
        } else {
          console.error(`Country ${this.countryName} not found.`);
        }
      });
    }

    // returns an object in the correct format for an ngx-charts line graph
    private calculatemedalsPerYear(countries: Country[] | null): void {
      if (countries) {
        this.medalsPerYear = countries.map((country) => ({
          name: country.country,
          series: country.participations.map((participation) => ({
            name: participation.year.toString(),
            value: participation.medalsCount,
          })),
        }));
      } else {
        this.medalsPerYear = [];
      }
    }

    // reduce the object medalsPerYear to only the country selected from the pie graph
    medalsForCountry(countryName: string): void {
      // Find the country object in MedalsPerYear where name matches countryName
      this.countryMedals = this.medalsPerYear.find((country) => country.name === countryName) || null;
    }
    
}