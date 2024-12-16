import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineGraphComponent } from 'src/app/graphs/line-graph/line-graph.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgxChartsModule, LineGraphComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public countryName: string = '';
  public totalParticipations: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public countryMedals: { name: string; series: { name: string; value: number }[] } | null = null;
  public medalsPerYear: { name: string; series: { name: string; value: number }[] }[] = [];
  
  private olympicsSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private olympicService: OlympicService) {}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const country = params['countryName'];
    
        if (!country) {
          console.error('Country parameter is missing.');
          this.router.navigate(['/404']);
          return;
        }
    
        this.countryName = country;
           
      });

      // Initalizing and subscribing to the Observable
      this.olympicService.loadInitialData();
      this.olympicsSubscription = this.olympicService.getOlympics().subscribe((countries) => {
        
        this.calculateCountryStats(countries); 
        
        // for line chart
        this.medalsPerYearAllCountries(countries);

        // Iterates over ngx-charts object to find a specific country
        this.medalsPerYearSelectedCountry(this.countryName);
        
      });
    }

    ngOnDestroy(): void {
      if (this.olympicsSubscription) {
        this.olympicsSubscription.unsubscribe(); 
      }
    }

    goBack() {
      this.router.navigate(['/']); 
    }

    // takes data from subscribed Observable as parameters
    private calculateCountryStats(countries: Country[] | null): void {
      if (!countries) {
        console.error('Olympics data not loaded yet.');
        this.router.navigate(['/404']);
        return;
      }

      const country = countries.find((c) => c.country === this.countryName);
      if (country) {
        this.totalParticipations = country.participations.length;
        this.totalMedals = country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
        this.totalAthletes = country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
      } else {
        console.error(`Country ${this.countryName} not found.`);
        this.router.navigate(['/404']);
      }
    }

    // for use with ngx-charts line graph
    // takes data from subscribed Observable as parameters
    private medalsPerYearAllCountries(countries: Country[] | null): void {
      if (countries) {
        this.medalsPerYear = countries.map((country) => ({
          name: country.country,
          series: country.participations.map((participation) => ({
            name: participation.year.toString(),
            value: participation.medalsCount,
          })),
        }));
      }
    }

    // for use with ngx-charts line graph
    private medalsPerYearSelectedCountry(countryName: string): void {
      this.countryMedals = this.medalsPerYear.find((country) => country.name === countryName) || null;
    }
    
}