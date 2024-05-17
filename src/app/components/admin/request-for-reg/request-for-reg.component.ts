import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AdminService } from '../../../services/admin service/admin.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms'; // Importujte FormsModule

@Component({
  selector: 'request-for-reg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-for-reg.component.html',
  styleUrl: './request-for-reg.component.css'
})
export class RequestForRegComponent implements OnInit{
  users: any[] = [];
  pom: any;
  selectedOption: string = 'ime'; // Defaultno selektovana opcija

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  filterUsersByOption(): void {
    if (this.selectedOption === 'ime') {
      this.users = this.users.sort((a, b) => (a.ime > b.ime) ? 1 : -1); // lambda izrazi - za leksiografsko sortiranje
    } else if (this.selectedOption === 'prezime') {
      this.users = this.users.sort((a, b) => (a.prezime > b.prezime) ? 1 : -1);
    }
  }

  fetchUsers(): void {
    if (this.pom && this.pom.id) {
      const userId = this.pom.id;
      console.log('User ID:', userId);
    } else {
      console.log('User ID not found in token.');
    }

    this.adminService.getAllInactiveKorisnici().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    );
  }

  ponisti(id: number, email: string): void {
    this.adminService.deleteKorisnik(id, email).subscribe(
      (success : any) => {
        if (success) {
          console.log('Korisnik uspešno obrisan.');
          this.fetchUsers();

          this.toastr.success('', 'Uspesno ste izbrisali zahtev za registraciju!');

        } else {
          console.log('Nije pronađen korisnik sa datim ID-om.');
        }
        this.toastr.success('', 'Uspesno ste izbrisali zahtev za registraciju!');
      },
      error => {
        console.error('Greška prilikom brisanja korisnika:', error);
        this.fetchUsers();
        this.toastr.success('', 'Uspesno ste izbrisali zahtev za registraciju!');

      }
    );
  }

  odobri(id: number, email: string): void {
    console.log("Id " + id + " email " + email);
    this.adminService.odobriRegistraciju(id, email).subscribe(
      response => {
        this.adminService.sendEmail(email, "Usesna registracija", "Cestitamo!").subscribe(
          response => {
            console.log("Poslata je poruka", response);
          }
        );
        console.log('Odgovor sa servera:', response); // odgovor sa servera
        this.fetchUsers();
        this.toastr.success('', 'Uspesno ste odobrili zahtev za registraciju!');
      },
      error => {
        console.error('Greška prilikom dodavanja korisnika:', error); //  greška koju je server vratio
        this.fetchUsers();
        // this.toastr.error('', 'Neuspesno odobravanje zahteva za registraciju!');
        this.toastr.success('', 'Uspesno ste odobrili zahtev za registraciju!');

      }
    );
  }
}
