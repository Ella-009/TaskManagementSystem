import { Injectable } from '@angular/core'; 
import { CanActivate, Router } from '@angular/router'; 
import { AuthenticationService } from './authentication.service'; 

@Injectable({
  providedIn: 'root'
})

export class AuthGard implements CanActivate {
  constructor(
    private authService: AuthenticationService, 
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}