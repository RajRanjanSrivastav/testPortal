import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';
import { HrjobService } from '../../services/hrjob.service';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
};

export type ChartOptions1 = {
  series: any[];
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
};


/*----- interface for Table data list ------ */
export interface PeriodicElement {
  stateName: string;
  position: number;
  hazardName: number;
  typeOfOrg: string;
  Organization: string;
  approxBudget: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, stateName: 'Hydrogen', hazardName: 1.0079, typeOfOrg: 'H', Organization: 'NDMA', approxBudget: 100 },
  { position: 2, stateName: 'Helium', hazardName: 4.0026, typeOfOrg: 'He', Organization: 'NDMA', approxBudget: 120 },
  { position: 3, stateName: 'Karnataka', hazardName: 6.941, typeOfOrg: 'Li', Organization: 'NDMA', approxBudget: 200 },
  { position: 4, stateName: 'Tamil Nadu', hazardName: 9.0122, typeOfOrg: 'Be', Organization: 'NDMA', approxBudget: 110 },
  { position: 5, stateName: 'Odisha', hazardName: 10.811, typeOfOrg: 'B', Organization: 'NDMA', approxBudget: 10 },
  { position: 6, stateName: 'Tamil Nadu', hazardName: 12.0107, typeOfOrg: 'C', Organization: 'NDMA', approxBudget: 230 },
  { position: 7, stateName: 'Nitrogen', hazardName: 14.0067, typeOfOrg: 'N', Organization: 'NDMA', approxBudget: 30 },
  { position: 8, stateName: 'Karnataka', hazardName: 15.9994, typeOfOrg: 'O', Organization: 'NDMA', approxBudget: 400 },
  { position: 9, stateName: 'Fluorine', hazardName: 18.9984, typeOfOrg: 'F', Organization: 'NDMA', approxBudget: 50 },
  { position: 10, stateName: 'Neon', hazardName: 20.1797, typeOfOrg: 'Ne', Organization: 'NDMA', approxBudget: 110 },
  { position: 11, stateName: 'Sodium', hazardName: 22.9897, typeOfOrg: 'Na', Organization: 'NDMA', approxBudget: 210 },
  { position: 12, stateName: 'Magnesium', hazardName: 24.305, typeOfOrg: 'Mg', Organization: 'NDMA', approxBudget: 30 },
  { position: 13, stateName: 'Aluminum', hazardName: 26.9815, typeOfOrg: 'Al', Organization: 'NDMA', approxBudget: 50 },
  { position: 14, stateName: 'Silicon', hazardName: 28.0855, typeOfOrg: 'Si', Organization: 'NDMA', approxBudget: 14 },
  { position: 15, stateName: 'Phosphorus', hazardName: 30.9738, typeOfOrg: 'P', Organization: 'NDMA', approxBudget: 41 },
  { position: 16, stateName: 'Sulfur', hazardName: 32.065, typeOfOrg: 'S', Organization: 'NDMA', approxBudget: 610 },
  { position: 17, stateName: 'Chlorine', hazardName: 35.453, typeOfOrg: 'Cl', Organization: 'NDMA', approxBudget: 140 },
  { position: 18, stateName: 'Argon', hazardName: 39.948, typeOfOrg: 'Ar', Organization: 'NDMA', approxBudget: 13 },
  { position: 19, stateName: 'Potassium', hazardName: 39.0983, typeOfOrg: 'K', Organization: 'NDMA', approxBudget: 10 },
  { position: 20, stateName: 'Calcium', hazardName: 40.078, typeOfOrg: 'Ca', Organization: 'NDMA', approxBudget: 16 },
];


@Component({
  selector: 'app-ngo-dashboard',
  standalone: true,
  imports: [NgApexchartsModule,MatPaginator,MatSort,CommonModule,MatTableModule],
  templateUrl: './ngo-dashboard.component.html',
  styleUrl: './ngo-dashboard.component.css'
})
export class NgoDashboardComponent implements OnInit {
  public chartOptions!: ChartOptions;
  public ChartOptions1!: ChartOptions1;


  displayedColumns: string[] = ['position', 'stateName', 'hazardName', 'typeOfOrg', 'Organization'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  color = '#4a2828' //backgrougnd color of tablehead

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private serv:HrjobService) {
    this.createPieChart();
    this.createBarChart();
  }

  ngOnInit(): void {
    this.getListOfRecords();
   }

  // Pie chart
  createPieChart() {
    // Pie chart
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'pie',
        height: 461
      },
      labels: ['Hailstorm', 'Flood', 'Earthquake', 'Drought', 'Avalanche'],
      title: {
        text: ''
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  //Bar chart
  createBarChart() {
    this.ChartOptions1 = {
      series: [{
        name: "Series 1",
        data: [44, 55, 13, 43, 22, 44, 11, 21, 32, 12, 11, 51]
      }],
      chart: {
        type: "bar",
        height: 450
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  //for data table
  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue,'this is ');
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* --------------------get the list of records ------------------- */
  getListOfRecords()
  {
    this.serv.getListOfRecords().subscribe({
      next:(res)=>{
        if(res.type)
          {
            console.log(res);
          }
          else{
            console.log(res,'error se');
            
          }
      },
      error:(err)=>{
        console.log(err,'this is');
        
      }
    })
  }

}


