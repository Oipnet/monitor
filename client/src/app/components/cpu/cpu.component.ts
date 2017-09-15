import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { MonitorService } from '../../services/monitor.service'

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private datas: Array<any>;
  private totalMemoire:any;
  private labels: Array<string>;
  private options: any = {
    responsive: true
  }
  private type: string = 'line';
  private datasets: Array<any>;
  private chartlabels: Array<string>;
  private refresh: boolean = false;

  constructor(private monitorService: MonitorService) { 
    this.datas = [{ data: [], label: `CPU`}];
    this.labels = [];
  }

  ngOnInit() {
    this.monitorService.onCPUData().subscribe(cpuDatas => {
      this.datas[0].data.push(cpuDatas)
      const now = new Date;
      this.labels.push(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

      setTimeout(() => {
        if (this.chart && this.chart.chart && this.chart.chart.config) {
          this.chart.chart.config.data.labels = this.labels;
          this.chart.chart.config.data.datasets = this.datas;
          this.chart.chart.update();
        }
      })
    })
   this.monitorService.totalMemory().subscribe(el => { this.totalMemoire = el });
  }

  resetChart() {
    this.datas = [{ data: [], label: `CPU`}];
    this.labels = [];

    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.config.data.labels = this.labels;
        this.chart.chart.config.data.datasets = this.datas;
        this.chart.chart.update();
      }
    })
  }

  chartHovered(event) 
  {
    console.log('hover');
  }
  chartClicked(event)
  {
    console.log('click');
  }
}
