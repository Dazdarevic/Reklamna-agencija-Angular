import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { LoginServiceService } from '../../../services/login service/login.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  role: any;
  loginForm!: FormGroup;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: ['',Validators.required],
      userPassword: ['',Validators.required],
    })
  }

  login() {
    console.log("login() funkcija pozvana."); //

    if (this.loginForm.valid) {
      console.log("Forma je validna."); //

      const formValue = this.loginForm.value;
      console.log("User Email: " + formValue.userEmail + " User Password: " + formValue.userPassword);

      const user = {
        Email: formValue.userEmail,
        Password: formValue.userPassword,
        AccessToken: '',
        RefreshToken: ''
      };

        this.loginService.login(user).subscribe({
          next: (res : any) => {
            console.log("Odgovor sa servera: ", res); //
            const accessToken = res.accessToken;

            localStorage.setItem('token', accessToken);
            console.log("Radii", res.accessToken);



            const token = localStorage.getItem('token');

            if (token) {
              const decodedToken: any = jwt_decode(token);

              console.log(decodedToken);
              // this.userId = decodedToken?.UserId;
              this.role = decodedToken?.UserRole;
            }
            console.log("ULOGA: " + this.role);

            if (this.role == "Admin") {
              this.router.navigate(['/myprofile']);
            }
            if (this.role == "Klijent") {
              this.router.navigate(['/myprofile']);
            }
            if (this.role == "Posetilac") {
              this.router.navigate(['/myprofile']);
            }
            else {
              //this.router.navigate(['/login']);
            }

          }, error: (err) => {
            this.message = 'Nevalidni podaci.';
            console.log("Greška sa servera: ", err);
          }
        })
      } else {
        this.message = 'Nevalidni podaci.';
        console.log("Forma nije validna.");
      }
    }
  }
