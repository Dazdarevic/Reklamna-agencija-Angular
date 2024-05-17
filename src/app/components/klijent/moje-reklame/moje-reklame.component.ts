import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../../../services/klijent service/klijent.service';
import jwt_decode from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'moje-reklame',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './moje-reklame.component.html',
  styleUrl: './moje-reklame.component.css'
})
export class MojeReklameComponent implements OnInit{
  reklame: any[] = [];
  userId: any;

  constructor(
    private datePipe: DatePipe,
    private klijentService: KlijentService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchReklame();
  }

  deleteReklama(id: number) {
    this.klijentService.deleteReklama(id).subscribe(
      () => {
        this.fetchReklame();
        console.log('Reklama uspešno obrisana.');
        this.toastr.success('', 'Uspesno ste izbrisali reklamu!');

      },
      (error) => {
        this.fetchReklame();
        console.error('Došlo je do greške prilikom brisanja reklame:', error);
        this.toastr.error('Reklama je vec odobrena i nemoguce je izbrisati.', 'Neuspesno brisanje reklame!');

      }

    );
  }

  fetchReklame(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwt_decode(token);

      console.log(decodedToken);
      this.userId = decodedToken?.UserId;
    }
    this.klijentService.getReklameByKlijentId(this.userId).subscribe(
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
