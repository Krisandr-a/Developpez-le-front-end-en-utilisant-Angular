import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public countryName: string = '';
  public totalParticipations?: number = 0;
  public totalMedals?: number = 0;
  public totalAthletes?: number = 0;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

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
    }

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
}