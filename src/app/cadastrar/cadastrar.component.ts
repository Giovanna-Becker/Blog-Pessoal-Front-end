import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  Usuario: usuario = new usuario
  confSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoUser = event.target.value
  }

  cadastrar() {
    this.Usuario.tipo = this.tipoUser

    if(this.Usuario.senha != this.confSenha){
      alert('As senhas estão incorretas.')
    }else{
      this.authService.cadastrar(this.Usuario).subscribe((resp: usuario) => {
        this.Usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuario cadastrado com sucesso!')

      })
    }
  }

}
