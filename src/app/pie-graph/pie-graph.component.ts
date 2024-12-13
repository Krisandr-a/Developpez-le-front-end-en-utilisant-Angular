import { Component, Input, OnInit, NgModule, HostListener } from '@angular/core';
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

  view: [number, number] = [700, 400]; // Default for desktop
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = 'cool'

  constructor(private router: Router) {}
  
  ngOnChanges() {
  }

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustChartSize(); // Adjust on window resize
  }

  // Adjust chart size based on screen width
  adjustChartSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      // For tablets and smaller, reduce chart width and height
      this.view = [screenWidth - 40, 300]; // Allow some margin on the sides
    } else {
      // Larger screens (desktop)
      this.view = [700, 400];
    }
  }

  // Navigate to the country details page
  onSelect(data: { name: string; value: number }): void {
    this.router.navigate(['details/', data.name]);
  }
}