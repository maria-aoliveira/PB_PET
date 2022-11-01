import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js';
import { Pet } from 'src/app/models/pet.model';


// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2
// } from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public pet: Pet = null;

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCurrentPet();

    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    // this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
  }

  // public updateOptions() {
  //   this.salesChart.data.datasets[0].data = this.data;
  //   this.salesChart.update();
  // }

  private getCurrentPet() {
    const currentPet = localStorage.getItem("currentPet");
    if (currentPet) this.setPetDashboard(JSON.parse(currentPet) as Pet)
  }

  private setPetDashboard(pet: Pet): void {
    this.pet = pet;
  }

  public goToSintomas(){
    this.router.navigate(['sintomas']);
  }

  public goToVacinas(){
    this.router.navigate(['vacinas']);
  }

  public goToMedicamentos(){
    this.router.navigate(['medicamentos']);
  }

  public goToControlePeso(){
    this.router.navigate(['controle-peso']);
  }

  public goToAlimentacao(){
    this.router.navigate(['alimentacao']);
  }

  public goToComportamento(){
    this.router.navigate(['comportamento']);
  }

  public goToExames(){
    this.router.navigate(['exames']);
  }

}
