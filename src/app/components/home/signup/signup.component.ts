import { Component } from '@angular/core';
// import { PhoneFormatPipe } from '../phone-format.pipe';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { SignupService } from '../../../services/signup service/signup.service';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../../services/photo service/photo.service';

@Component({
  selector: 'signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  gender: string | undefined;
  phone = "2556522000";
  showSecureCodeField = false;
  registerForm!: FormGroup;
  success = false;
  errMessage: string = '';
  randomNumber = Math.floor(10000 + Math.random() * 90000);
  selectedFile!: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private signupService: SignupService,
    private route: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      profileImg: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^06[0-9]{8}$')]],
      password: ['', Validators.required],
      repPassword: ['', [Validators.required, this.passwordMatchValidator]],
      // gender: ['', Validators.required],
      // secureCode: ['']

    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('userPassword')?.value;
    const repeatedPassword = control.get('repPassword')?.value;

    return password === repeatedPassword ? null : { passwordMismatch: true };
  };

  handleSubmit(): void {
    console.log(this.registerForm.value);
    this.errMessage = this.getErrorMessage();
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const email = formValue.email;

      this.signupService.checkEmailExists(email).subscribe(
        exists => {
          if (exists) {
            this.errMessage = "Email adresa vec postoji.";
            console.log('E-mail adresa već postoji.');
          } else {
            const role = formValue.role;
            const korisnikData = {
              status: false,
              prezime: formValue.lastName,
              ime: formValue.firstName,
              email: formValue.email,
              password: formValue.password,
              brTel: formValue.phoneNumber,
              uloga: formValue.role,
              pol: formValue.gender,
              profilna: this.selectedFile,
              datumRodjenja: formValue.birthDate
            };
            this.signupService.dodajKorisnika(korisnikData).subscribe(
              (response) => {
                console.log(response)
                if (response) {
                  // Handle success
                  this.route.navigate(['/login']);
                  console.log('User added:', response);
                }
                if (!response) {
                  // Handle unexpected response
                  this.errMessage = "Greska.";
                  console.log('Unexpected response:', this.errMessage);
                }
              },
              (error) => {
                // Handle error
                this.errMessage = "Došlo je do greške prilikom dodavanja korisnika.";
                console.log('Error adding admin:', error);
              }
            );
          }
        }
      );
    }
  }

  checkEmail(email: string): void {
    this.signupService.checkEmailExists(email)
      .subscribe(exists => {
        if (exists) {
          this.errMessage = "Email adresa već postoji.";
          console.log('E-mail adresa već postoji.');
        } else {
          console.log('E-mail adresa nije pronađena.');
        }
      });
  }
  resetForm() {
    this.registerForm.reset();
    this.errMessage = '';
  }

  getErrorMessage() : any {
    const formControls = this.registerForm.controls;

    if (formControls['firstName'].errors?.['required']) {
      return 'Ime je obavezno.';
    } else if (formControls['lastName'].errors?.['required']) {
      return 'Prezime je obavezno.';
    } else if (formControls['birthDate'].errors?.['required']) {
      return 'Datum rodjenja je obavezan.';
    } else if (formControls['email'].errors?.['required']) {
      return 'Email adresa je obavezna.';
    } else if (formControls['email'].errors?.['pattern']) {
      return 'Nevalidan email format.';
    } else if (formControls['phoneNumber'].errors?.['required']) {
      return 'Broj telefona je obavezan.';
    } else if (formControls['phoneNumber'].errors?.['pattern']) {
      return 'Nevalidan broj telefona format.';
    }
    else if (formControls['profileImg'].errors?.['required']) {
      return 'Profilna slika je obavezna.';
    } else if (formControls['password'].errors?.['required']) {
      return 'Lozinka je obavezna.';
    } else if (formControls['repPassword'].errors?.['required']) {
      return 'Ponovljena lozinka je obavezna.';
    } else if (formControls['repPassword'].errors?.['passwordMismatch']) {
      return 'Lozinke se ne poklapaju.';
    } else if (formControls['role'].errors?.['required']) {
      return 'Uloga je obavezna.';
    }else if (formControls['gender'].errors?.['required']) {
      return 'Pol je obavezan.';
    }

if (
    !formControls['firstName'].value ||
    !formControls['lastName'].value ||
    !formControls['birthDate'].value ||
    !formControls['email'].value ||
    !formControls['phoneNumber'].value ||
    !formControls['profileImg'].value ||
    !formControls['password'].value ||
    !formControls['repPassword'].value ||
    !formControls['gender'].value ||
    !formControls['role'].value
  )
    return 'Sva polja su obavezna.';

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
