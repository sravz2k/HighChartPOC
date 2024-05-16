import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsOrganization from 'highcharts/modules/organization';
import HighchartsExporting from 'highcharts/modules/exporting';

HighchartsMore(Highcharts);
HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);
HighchartsExporting(Highcharts);

interface CustomSeriesSankeyPointOptionsObject extends Highcharts.SeriesSankeyPointOptionsObject {
  vendor?: string;
  vendorBatch?: string;
  vendorName?: string;
  sap?: string;
  manufactureDate?: string;
  expiryDate?: string;
  materialNumber?: string;
  toggleDetails?: boolean;
}

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent {
  Highcharts: typeof Highcharts = Highcharts; 
  chartOptions: Highcharts.Options = {};

  constructor() {
    
    this.chartOptions = {
      series: [],
      title: {
        text: ''
      },
    };
   }
     
  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'organization',
        renderTo: 'container',
        inverted: true,
      },
      title: {
        text: ''
      },
      series: [{
        type: 'organization',
        keys: ['id', 'from', 'to', 'name', 'vendor', 'vendorName', 'sap', 'materialNumber', 'manufactureDate', 'expiryDate', 'toggleDetails'],
        dataLabels: {
          enabled: true, 
          color: 'black', 
          nodeFormatter: function () {
            const sankeyNode = this.point as Highcharts.SankeyNodeObject;
            const nodeData = sankeyNode.series.data[sankeyNode.index] as any;
            const arrowButton = `<button class="chart-button">toggle</button>`;
            let label =`<div style="display:flex; justify-content:space-between;">
              <div>
                <div style="font-size: 8px; font-weight: 400; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.name}</div>
                <div style="font-size: 10px; font-weight: 600; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.id}</div>
              </div>
              <div>${arrowButton}</div>
            </div>`
           
            const detailsTable = `
            <table>
              <tr>
                <th style="font-size: 8px; font-weight: 400; line-height: 14px; letter-spacing: 0.02em; text-align: left;">Vendor:</th>
                <td style="font-size: 10px; font-weight: 600; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.vendor}</td>
              </tr>
              <tr>
                <th style="font-size: 8px; font-weight: 400; line-height: 14px; letter-spacing: 0.02em; text-align: left;">Vendor Name:</th>
                <td style="font-size: 10px; font-weight: 600; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.vendorName}</td>
              </tr>
              <tr>
                <th style="font-size: 8px; font-weight: 400; line-height: 14px; letter-spacing: 0.02em; text-align: left;">SAP:</th>
                <td style="font-size: 10px; font-weight: 600; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.sap}</td>
              </tr>
              <tr>
                <th style="font-size: 8px; font-weight: 400; line-height: 14px; letter-spacing: 0.02em; text-align: left;">Material Number:</th>
                <td style="font-size: 10px; font-weight: 600; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.materialNumber}</td>
              </tr>
              <tr>
                <th style="font-size: 8px; font-weight: 400; line-height: 14px; letter-spacing: 0.02em; text-align: left;">Manufacture Date:</th>
                <td style="font-size: 10px; font-weight: 600; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.manufactureDate}</td>
              </tr>
              <tr>
                <th style="font-size: 8px; font-weight: 400; line-height: 14px; letter-spacing: 0.02em; text-align: left;">Expiry Date:</th>
                <td style="font-size: 10px; font-weight: 600; line-height: 14px; letter-spacing: 0.02em; text-align: left;">${nodeData.options.expiryDate}</td>
              </tr>
            </table>
            `;
            return label + detailsTable;
          }
        },
        data: [
          { id: '1234', name: 'Test1 Lot', vendor: 'vendor1', vendorName: 'vendorname1', sap: 'plant1', materialNumber: 'mtno1', manufactureDate:"2024-05-16", expiryDate:"2024-05-17",  toggleDetails: false},
          { id: '2345', from: '1', to: '2', name: 'Test2 Lot', vendor: 'vendor2', vendorName: 'vendorname2', sap: 'plant2', materialNumber: 'mtno2', manufactureDate:"2024-05-16", expiryDate:"2024-05-17", toggleDetails: false  },
          { id: '3456', from: '2', to: '3', name: 'Test3 Lot', vendor: 'vendor3', vendorName: 'vendorname3', sap: 'plant3', materialNumber: 'mtno3', manufactureDate:"2024-05-16", expiryDate:"2024-05-17", toggleDetails: false },
          { id: '4567', from: '2', to: '4', name: 'Test4 Lot', vendor: 'vendor4', vendorName: 'vendorname4', sap: 'plant4', materialNumber: 'mtno4', manufactureDate:"2024-05-16", expiryDate:"2024-05-17", toggleDetails: false },
        ] as CustomSeriesSankeyPointOptionsObject[],
        states: {
          hover: {
            enabled: false 
          },
          inactive: {
            opacity: 1,
          }
        },
        colorByPoint: false,
        color: 'white',
        borderColor: 'black',
        nodeWidth: 160,
        borderRadius: 5,
      }],
      tooltip: {
        outside: true
      },
    };
  }
}
