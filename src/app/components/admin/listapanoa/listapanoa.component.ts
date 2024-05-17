import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin service/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'listapanoa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listapanoa.component.html',
  styleUrl: './listapanoa.component.css'
})
export class ListapanoaComponent implements OnInit {
  reklamniPanoi!: any[];
  displayStyleEdit = "none";
  addForm!: FormGroup;
  id!: number;
  url!: string;
  gradovi: string[] = [];
  selectedGrad: string = ''; // inicijalno nema odabranog grada
  originalReklamniPanoi: any[] = [];

  constructor(
    private reklamniPanoiService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchReklamniPanoi();
    this.fetchGradovi(); // Dodajte ovaj poziv

      this.addForm = this.formBuilder.group({
        id: [''],
        adminAgencijeId: [''],
        urlSlike: [''],
        adresa: [''],
        grad: [''],
        dimenzija: [''],
        zona: [''],
        cijena: [''],
        osvetljenost: ['']
      });

  }
  fetchReklamniPanoi(): void {
    this.reklamniPanoiService.getReklamniPanoi().subscribe(
      data => {
        this.reklamniPanoi = data;
        this.originalReklamniPanoi = data; // originalni skup podataka

      },
      error => {
        console.error('Greška prilikom dohvatanja reklamnih panoa:', error);
      }
    );
  }

  fetchGradovi(): void {
    this.reklamniPanoiService.getGradovi().subscribe(
      data => {
        this.gradovi = data;
      },
      error => {
        console.error('Greška prilikom dohvatanja gradova:', error);
      }
    );
  }

  deleteReklamniPano(id: number): void {
    this.reklamniPanoiService.deleteReklamniPano(id).subscribe(
      response => {
        console.log('Reklamni pano uspesno obrisan:', response);
        this.fetchReklamniPanoi();
        this.toastr.success('', 'Uspesno ste izbrisali reklamni pano!');
      },
      error => {
        console.error('Greška prilikom brisanja reklamnog panoa:', error);
        this.fetchReklamniPanoi();
        
        this.reklamniPanoiService.provjeriReklamuNaPanelu(id).subscribe(
          result => {
            if (result) {
              console.log('Na panelu postoji reklama.');
              this.toastr.error('Na panelu postoji reklama!', 'Neuspesno brisanje!');
            } else {
              console.log('Na panelu ne postoji reklama.');
              this.toastr.success('', 'Uspesno ste izbrisali reklamni pano!');
            }
          },
          error => {
            console.error('Greška prilikom provjere reklame na panelu:', error);
          }
        );
      }
    );
  }
  onGradChange(event: any) {
    const selectedGrad = event.target.value;
    if (selectedGrad === "Svi gradovi") {
        this.fetchReklamniPanoi();
    } else {
      this.reklamniPanoi = this.originalReklamniPanoi.filter((pano) => pano.grad === selectedGrad);
    }
  }

  openPopup(id: number, urlSlike: string): void {
    this.id = id;
    this.url = urlSlike;
    this.reklamniPanoiService.getReklamniPanoAdmin(id).subscribe((data: any) => {
        this.addForm.patchValue(data);
        this.displayStyleEdit = 'block';
    });
}


  closePopupEdit() {
    this.displayStyleEdit = "none";
    this.fetchReklamniPanoi();
  }

  handleSubmit(): void {
    console.log("radi");
    if (this.addForm.valid) {
      const formValue = this.addForm.value;

      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwt_decode(token);

        formValue.adminAgencijeId = decodedToken?.UserId;
        // formValue.urlSlike = this.url;
      }

      const data = {
        id: this.id,
        adminAgencijeId: formValue.adminAgencijeId,
        urlSlike: this.url,
        adresa: formValue.adminAgencijeId,
        dimenzija: formValue.dimenzija,
        osvetljenost: formValue.osvetljenost,
        grad: formValue.grad,
        zona: formValue.zona,
        cijena: formValue.cijena,
      };
      console.log(formValue);
      this.reklamniPanoiService.azurirajReklamniPano(this.id, data).subscribe(
        (response) => {
          // Handle success
          console.log(' added:', response);
          this.closePopupEdit();
          this.toastr.success('', 'Uspesno ste azurirali reklamni pano!');
        },
        (error) => {
          // Handle error
          console.error('Error adding:', error);
          this.toastr.error('', 'Neupesno azuriranje reklamnog panoa!');

        }

      );
    }
  }


}
