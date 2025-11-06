import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AuthService } from "../../services/auth.service";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  fb = new FormBuilder();
  loginForm: any;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogIn() {
    this.authService.login(this.loginForm?.value).subscribe(
      (response: any) => {
        this.authService.setLoginState(response.token, response.user);
        this.router.navigateByUrl("/");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
