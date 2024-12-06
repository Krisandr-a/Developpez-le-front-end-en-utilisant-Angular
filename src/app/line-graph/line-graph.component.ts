import { Component, Input } from '@angular/core';
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

  view: [number, number] = [700, 300];

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

}
