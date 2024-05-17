import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin service/admin.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { KlijentService } from '../../../services/klijent service/klijent.service';

@Component({
  selector: 'admin-fakture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-fakture.component.html',
  styleUrl: './admin-fakture.component.css'
})
export class AdminFaktureComponent implements OnInit{
  fakture!: any[];
  userId: number | undefined;
  userRole: string | undefined;
  selectedFile: any | null = null;
  userInfo: any | undefined;
  constructor(private fakturaService: AdminService, private faktureKlijent: KlijentService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwt_decode(token);

      console.log(decodedToken);
      this.userId = decodedToken?.UserId;
      this.userRole = decodedToken?.UserRole;

      if (this.userId && this.userRole) {
        this.getFaktureZaAdmina(this.userId);
      }
    }
    // this.getFaktureZaAdmina(1);
  }

  getFaktureZaAdmina(id: number): void {
    this.faktureKlijent.getFaktureZaAdmina(id)
      .subscribe(fakture => this.fakture = fakture);
  }


}
