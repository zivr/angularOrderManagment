import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../orders/order.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  // Pie
  pieChartLabels: string[] = [];
  pieChartData: number[] = new Array(10);
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(calendar: NgbCalendar, private os: OrderService) {
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', -10);
    this.toDate = calendar.getToday();
    this.getInfoData();
  }
  
  getInfoData() {
    this.os.getOrdersDashboard(new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day), 
    new Date(this.toDate.year, this.toDate.month-1, this.toDate.day)).subscribe((data: Array<any>) => {
      this.pieChartLabels = data.map(item => item.customer);
      this.pieChartData = data.map(item => item.count);
      this.chart.chart.update();
    })
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit() {
  }

}
