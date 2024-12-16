import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  // Takes value initialized in HomeComponent as the Input
  @Input() totalMedalsByCountry: { name: string; value: number; }[] = [];

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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustChartSize();
  }

  // Used for responsive design instead of CSS due to ngx-charts having its own CSS
  adjustChartSize(): void {
    const screenWidth = window.innerWidth;
    // For tablets and smaller
    if (screenWidth < 768) {
      this.view = [screenWidth - 40, 300]; // Allows some margin on the sides
    } else {
      // For desktop
      this.view = [700, 400];
    }
  }

  // Navigate to the country details page
  onSelect(data: { name: string; value: number }): void {
    this.router.navigate(['details/', data.name]);
  }
}