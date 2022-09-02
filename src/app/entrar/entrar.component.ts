import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { usuarioLogin } from '../model/usuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  UsuarioLogin: usuarioLogin = new usuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.UsuarioLogin).subscribe((resp: usuarioLogin) => {
      this.UsuarioLogin = resp

      environment.token = this.UsuarioLogin.token
      environment.nome = this.UsuarioLogin.nome
      environment.foto = this.UsuarioLogin.foto
      environment.id = this.UsuarioLogin.id

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500 || erro.status == 401){
        alert('Usuario ou senha estão incorretos.')
      }
    })
  }

}
