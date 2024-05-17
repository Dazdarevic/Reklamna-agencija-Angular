import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin service/admin.service';
import { KlijentService } from '../../../services/klijent service/klijent.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'klijent-fakture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './klijent-fakture.component.html',
  styleUrl: './klijent-fakture.component.css'
})
export class KlijentFaktureComponent implements OnInit{
  fakture: any[] = [];
  userId: number | undefined;
  userRole: string | undefined;
  selectedFile: any | null = null;
  userInfo: any | undefined;

  constructor(private fakturaService: KlijentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwt_decode(token);

      console.log(decodedToken);
      this.userId = decodedToken?.UserId;
      this.userRole = decodedToken?.UserRole;

      if (this.userId && this.userRole) {
        this.getFaktureZaKlijenta(this.userId);
      }
    }
  }

  getFaktureZaKlijenta(id: number): void {
    this.fakturaService.getFaktureZaKlijenta(id)
      .subscribe(fakture => this.fakture = fakture);
  }


}
