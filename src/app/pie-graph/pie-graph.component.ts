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
  // to delete
  @Input() MedalsPerYear: { name: string; series: { name: string; value: number }[] }[] = [];

  view: [number, number] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = 'cool'

  constructor(private router: Router) {}
  
  ngOnChanges() {
  }

  onSelect(data: { name: string; value: number }): void {
    // Navigate to the country details page
    this.router.navigate(['details/', data.name]);
  }
}