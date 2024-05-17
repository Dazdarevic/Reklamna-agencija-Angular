import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { MyprofileService } from '../../services/myprofile service/myprofile.service';
import { PhotoService } from '../../services/photo service/photo.service';

@Component({
  selector: 'myprofile',
  standalone: true,
  imports: [],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})

export class MyProfileComponent implements OnInit {
  userId: number | undefined;
  userRole: string | undefined;
  selectedFile: any | null = null;
  userInfo: any | undefined;

  constructor(private userService: MyprofileService) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwt_decode(token);

      console.log(decodedToken);
      this.userId = decodedToken?.UserId;
      this.userRole = decodedToken?.UserRole;

      if (this.userId && this.userRole) {
        this.getUserByIdAndRole(this.userId, this.userRole);
      }
    }
  }
//   getFile(event: any) {
//     const file: File = event.target.files[0];
//     console.log("file" + file);
//     this.uploadPhoto(file);
//   }

//   uploadPhoto(file: File): void {
//   this.photoService.sendPhoto(file).subscribe(
//     (response) => {
//       console.log("Photo uploaded successfully", this.selectedFile);

//       this.userInfo!.url = response.url;
//       const token = localStorage.getItem('token');
//       if (token) {
//         const decodedToken: any = jwt_decode(token);
//         this.updateProfilePicture(decodedToken?.UserId, decodedToken?.UserRole, response.url);
//       }
//     },
//     (error) => {
//       console.log("Error " + error);
//     }
//   );
// }



//   //dodavanje profilne slike
//   updateProfilePicture(userId: number, role: string, profilePictureUrl: string): void {
//     this.userService.updateProfilePicture(userId, role, profilePictureUrl)
//       .subscribe(
//         response => {
//           console.log('URL slike profila uspešno ažuriran', response);
//         },
//         error => {
//           console.error('Greška prilikom ažuriranja URL-a slike profila', error);
//         }
//       );
//   }



  getUserByIdAndRole(id: number, role: string): void {
    this.userService.getUserByIdAndRole(id, role)
      .subscribe(
        result => {
          this.userInfo = result;
          console.log(this.userInfo);
        },
        error => {
          console.error('Greška prilikom dohvaćanja korisnika:', error);
        }
      );
  }
}
