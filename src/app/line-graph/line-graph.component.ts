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

  // To resize the charts for mobile: ngx-charts has its own CSS
  // so @media doesn't work
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

}
