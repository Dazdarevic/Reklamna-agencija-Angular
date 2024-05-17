import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin service/admin.service';
import { PhotoService } from '../../../services/photo service/photo.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'panoi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panoi.component.html',
  styleUrl: './panoi.component.css'
})
export class PanoiComponent {
  addForm!: FormGroup;
  products: any[] = [];
  selectedFile!: any;


  constructor(
    private photoService: PhotoService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    // this.fetchProducts();
    this.addForm = this.formBuilder.group({
      adresa: ['', Validators.required],
      grad: ['', Validators.required],
      slika: ['', Validators.required],
      zona: ['', Validators.required],
      dimenzija: ['', Validators.required],
      cijena: ['', Validators.required],
      osvetljenost: ['', Validators.required],
      adminAgencijeId: [''],

    });
  }

  handleSubmit(): void {
    console.log("radi");
    if (this.addForm.valid) {
      const formValue = this.addForm.value;

      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwt_decode(token);

        formValue.adminAgencijeId = decodedToken?.UserId;
        formValue.urlSlike = this.selectedFile;
      }

      const data = {
        adminAgencijeId: formValue.adminAgencijeId,
        urlSlike: this.selectedFile,
        adresa: formValue.adminAgencijeId,
        dimenzija: formValue.dimenzija,
        osvetljenost: formValue.osvetljenost,
        grad: formValue.grad,
        zona: formValue.zona,
        cijena: formValue.cijena,
      };
      console.log(formValue);
      this.adminService.dodajReklamniPano(data).subscribe(
        (response) => {
          // Handle success
          console.log(' added:', response);
          this.addForm.reset();
          this.toastr.success('', 'Uspesno ste dodali reklamni pano!');

        },
        (error) => {
          // Handle error
          console.error('Error adding:', error);
          this.toastr.error('', 'Neuspesno dodavanje reklamnog panoa!');


          // if (error instanceof HttpErrorResponse) {
          //   console.log('Status:', error.status);
          //   console.log('Status Text:', error.statusText);
          //   console.log('URL:', error.url);
          //   console.log('Error Details:', error.error);
          // }
        }

      );
    }
  }
  // getFile(event: any): void {
  //   const file: File = event.target.files[0];
  //   this.photoService.sendPhoto(file).subscribe(
  //     (response) => {
  //       console.log('Upload success:', response);
  //     },
  //     (error) => {
  //       console.error('Upload error:', error);
  //     }
  //   );
  // }

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
        console.log("Photo uploaded successfuly", response.url);
      },
      (error) => {
        console.log("Error " + error.response);
      }
    );
  }
}
