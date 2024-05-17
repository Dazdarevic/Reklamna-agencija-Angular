import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../../../services/klijent service/klijent.service';
import jwt_decode from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'svereklame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svereklame.component.html',
  styleUrl: './svereklame.component.css'
})
export class SvereklameComponent {
  reklame: any[] = [];

  constructor(
    private klijentService: KlijentService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.fetchReklame();
  }
  fetchReklame(): void {
    this.klijentService.getOdobreneReklame().subscribe(
      reklame => {
        this.reklame = reklame;
        console.log('Reklame za klijenta:', this.reklame);
      },
      error => {
        console.error('Greška prilikom dobijanja reklama:', error);
      }
    );
  }
}
