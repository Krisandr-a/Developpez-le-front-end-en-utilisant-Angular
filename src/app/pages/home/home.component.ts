import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Country } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieGraphComponent } from 'src/app/graphs/pie-graph/pie-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PieGraphComponent, NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //private olympics$: Observable<Country[] | null> = of(null);
  public totalCountries: number = 0;
  public totalOlympicGames: number = 0;
  public totalMedalsByCountry: { name: string; value: number }[] = [];
  public MedalsPerYear: { name: string; series: { name: string; value: number }[] }[] = [];

  private olympicsSubscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData();
    this.olympicsSubscription = this.olympicService.getOlympics().subscribe((data) => {
      this.calculateTotalCountries(data);
      this.calculateTotalOlympicGames(data);
      this.calculateMedalsByCountry(data);
    });
  }

  ngOnDestroy(): void {
    if (this.olympicsSubscription) {
      this.olympicsSubscription.unsubscribe(); 
    }
  }

  private calculateTotalCountries(countries: Country[] | null): void {
    if (countries) {
      this.totalCountries = countries.length;
    }
  }

  private calculateTotalOlympicGames(countries: Country[] | null): void {
    if (countries) {
      let totalGames = 0;

      countries.forEach((country) => {
        const participationCount = country.participations.length;

        // in case some countries didn't participate every year
        if (participationCount > totalGames) {
          totalGames = participationCount;
        }
      });

      this.totalOlympicGames = totalGames;
    }
  }

  // for use in the pie graph
  calculateMedalsByCountry(countries: Country[] | null): void {
    if (countries) {
      this.totalMedalsByCountry = countries.map((country) => {
        let totalMedals = 0;

        country.participations.forEach((participation) => {
          totalMedals += participation.medalsCount;
        });

        // Required format for ngx-charts pie graph
        return {
          name: country.country,
          value: totalMedals,
        };
      });
    }
  }

}
