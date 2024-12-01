import { Component, Input, OnInit, NgModule } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-graph',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './pie-graph.component.html',
  styleUrl: './pie-graph.component.scss'
})
export class PieGraphComponent {
  // Takes the key:value (country:medals) initialized in HomeComponent
  // @Input() says it will receive data from parent component
  @Input() totalMedalsByCountry: { name: string; value: number; }[] = [];
  //totalMedalsByCountryTransformed: { name: string; value: number; }[] = [];

  view: [number, number] = [700, 400];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = 'cool'

  constructor(private router: Router) {}
  
  ngOnChanges() {
    console.log("Graph data:")
    console.log(this.totalMedalsByCountry);
    /*console.log(this.totalMedalsByCountryTransformed);
    console.log(this.totalMedalsByCountry);
    this.transformDataForGraph()*/
  }

  onSelect(data: { name: string; value: number }): void {
    console.log('Item clicked:', data);
    // Navigate to the country details page
    this.router.navigate(['details/', data.name]);
  }

  countriesAndMedals(obj: { [key: string]: any }) {
    return Object.keys(obj);
  }

  /* transformDataForGraph(): void {
    // Check if totalMedalsByCountry is defined and is an object
    if (this.totalMedalsByCountry && typeof this.totalMedalsByCountry === 'object') {
      this.totalMedalsByCountryTransformed = Object.entries(this.totalMedalsByCountry).map(([country, medals]) => ({
        name: country,
        value: medals,
      }));
    } else {
      console.error("totalMedalsByCountry is not a valid object");
      this.totalMedalsByCountryTransformed = [];
    }
  } */
  


}