import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../../../services/klijent service/klijent.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'request-for-ads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-for-ads.component.html',
  styleUrl: './request-for-ads.component.css'
})
export class RequestForAdsComponent implements OnInit{
  neodobreneReklame: any[] = [];

  constructor(
    private klijentService: KlijentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getNeodobreneReklame();
  }

  getNeodobreneReklame(): void {
    this.klijentService.getNeodobreneReklame()
      .subscribe(reklame => this.neodobreneReklame = reklame);
  }

  ponisti(id: number) {
    this.klijentService.deleteReklama(id).subscribe(
      () => {
        this.getNeodobreneReklame();
        console.log('Reklama uspešno obrisana.');
        this.toastr.success('', 'Uspesno ste odbili zahtev za reklamu!');

        // Dodajte odgovarajuće akcije nakon uspešnog brisanja reklame
      },
      (error) => {
        console.error('Došlo je do greške prilikom brisanja reklame:', error);
        this.toastr.success('', 'Uspesno ste odbili zahtev za reklamu!');

        // Dodajte odgovarajuće akcije u slučaju greške
      }
    );
  }
  kreirajFakturu(data: any): void {
    this.klijentService.kreirajFakturu(data).subscribe(
      (response) => {
        console.log('Faktura kreirana uspešno!', response);
        this.toastr.success('', 'Uspesno ste kreirali fakturu!');

      },
      (error) => {
        console.error('Greška prilikom kreiranja fakture:', error);
        this.toastr.success('', 'Neuspesno kreiranje fakture!');

      }
    );
  }
  odobri(id: number) {
    this.klijentService.odobriReklamu(id).subscribe(
      () => {
        this.getNeodobreneReklame();

        console.log('Reklama uspešno obrisana.');
        this.toastr.success('', 'Uspesno ste odobrili reklamu!');

      },
      (error) => {
        // this.getNeodobreneReklame();
        console.error('Došlo je do greške prilikom brisanja reklame:', error);
        this.toastr.success('', 'Uspesno ste odobrili reklamu!');
        this.getNeodobreneReklame();

        // Dodajte odgovarajuće akcije u slučaju greške
      }
    );
  }
}
