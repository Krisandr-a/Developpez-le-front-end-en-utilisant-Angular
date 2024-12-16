import { Component, HostListener, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.scss'
})
export class LineGraphComponent {
  @Input() countryMedals!: { name: string; series: { name: string; value: number; }[]; } | null;

  view: [number, number] = [700, 300]; // Default for desktop

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;

  colorScheme = 'cool'


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

}
