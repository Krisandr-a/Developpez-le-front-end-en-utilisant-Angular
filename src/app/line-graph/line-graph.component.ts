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
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;

  colorScheme = 'cool'


  ngOnChanges() {
    console.log("Line Graph data:")
    console.log(this.countryMedals);
    //console.log(this.totalMedalsByCountry);
    /*console.log(this.totalMedalsByCountryTransformed);
    console.log(this.totalMedalsByCountry);
    this.transformDataForGraph()*/
  }

}
