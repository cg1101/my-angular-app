import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { chart } from 'highcharts';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-chart-demo',
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.css']
})
export class ChartDemoComponent implements OnInit, AfterViewInit {

  @ViewChild('chartTarget') chartTarget: ElementRef;

  chart: HighCharts.ChartObject;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Usage'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          enabled: true,
          formatter: function (cfg) {
            console.log(`received ${arguments.length} arguments`, cfg);
            const s = [];
            for (let i = 0; i < arguments.length; i++) {
              s.push(arguments[i]);
            }
            console.log(`arguments, ${s}`, s);
            return 'xAxisLabel';
          }
        }
      },
      yAxis: {
        type: 'linear'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          },
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 's1',
          data: [1, 2, 3, 4, 5],
          pointWidth: 20
        },
        {
          name: 's2',
          data: [5, 4, 3, 2, 1],
          pointWidth: 20
        }
      ]
    };
    const opt2 = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Service Provider UC Cloud Usage'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total max usage of customers'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            // color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        // backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },
      series: [
        {
          name: 'John',
          data: [5, 3, 4, 7, 2]
        },
        {
          name: 'Jane',
          data: [2, 2, 0, 2, 1]
        },
        {
          name: 'Joe',
          data: [3, 4, 4, 2, 5]
        }
      ]
    };

    this.chart = chart(this.chartTarget.nativeElement, opt2);
  }
}
