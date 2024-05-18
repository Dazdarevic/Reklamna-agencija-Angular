import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin service/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { PhotoService } from '../../../services/photo service/photo.service';
import { KlijentService } from '../../../services/klijent service/klijent.service';

@Component({
  selector: 'reklamnipano',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reklamnipano.component.html',
  styleUrl: './reklamnipano.component.css'
})
export class ReklamnipanoComponent implements OnInit {
  reklamniPanoi!: any[];
  displayStyleEdit = "none";
  addForm!: FormGroup;
  id!: number;
  url!: string;
  selectedFile!: any;
  selectedGrad: string = ''; // inicijalno nema odabranog grada
  gradovi: string[] = [];
  originalReklamniPanoi: any[] = [];


  constructor(
    private reklamniPanoiService: AdminService,
    private router: Router,
    private klijentService: KlijentService,
    private photoService: PhotoService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchReklamniPanoi();
    this.fetchGradovi(); // Dodajte ovaj poziv

      this.addForm = this.formBuilder.group({
        klijentId: [''],
        reklamniPanoId: [''],
        slika: ['', Validators.required],
        odDatum: [''],
        doDatum: [''],
        opis: [''],
        grad: ['']
      });


  }

  fetchReklamniPanoi(): void {
    this.reklamniPanoiService.getReklamniPanoiBezReklame().subscribe(
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
    this.reklamniPanoiService.getGradoviBezReklama().subscribe(
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
      },
      error => {
        console.error('Greška prilikom brisanja reklamnog panoa:', error);
      }
    );
  }

  openPopup(id: number): void {
    this.id = id;
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

        formValue.klijentId = decodedToken?.UserId;
        // formValue.urlSlike = this.url;
      }

      const data = {
        klijentId: formValue.klijentId,
        reklamniPanoId: this.id,
        urlSlike: this.selectedFile,
        odDatum: formValue.odDatum,
        doDatum: formValue.doDatum,
        opis: formValue.opis,
        status: false,
      };

      console.log(formValue);
      this.klijentService.dodajReklamu(data).subscribe(
        (response) => {
          // Handle success
          console.log(' added:', response);
          this.closePopupEdit();
          this.fetchReklamniPanoi();
        },
        (error) => {
          // Handle error
          console.error('Error adding:', error);
        }

      );
    }
  }
  onGradChange(event: any) {
    const selectedGrad = event.target.value;
    if (selectedGrad === "Svi gradovi") {
        this.fetchReklamniPanoi();
    } else {
      this.reklamniPanoi = this.originalReklamniPanoi.filter((pano) => pano.grad === selectedGrad);
    }
  }

  getFile(event: any) {
    const file: File = event.target.files[0];
    console.log("file" + file);
    this.uploadPhoto(file);
  }

  uploadPhoto(file: File) {
    this.photoService.sendPhoto(file).subscribe(
      (response) => {
        this.selectedFile = response.secureUrl;
        console.log("slika", this.selectedFile);
        // console.log("Photo uploaded successfuly", response.url);
      },
      (error) => {
        console.log("Error " + error);
      }
    );
  }

}
