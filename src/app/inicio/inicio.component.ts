import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  
  Postagem: postagem = new postagem()
  listaPostagens: postagem[]

  Tema: tema = new tema()
  listaTemas: tema[]
  idTema: number

  Usuario: usuario = new usuario()
  idUsuario = environment.id

  constructor(
    private router:Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: tema) => {
      this.Tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: postagem[]) => {
      this.listaPostagens = resp
    })
  }

  getFindByIdUsuario(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: usuario) => {
      this.Usuario = resp
    })
  }

  publicar(){
    this.Tema.id = this.idTema
    this.Postagem.tema = this.Tema

    this.Usuario.id = this.idUsuario
    this.Postagem.usuario = this.Usuario

    this.postagemService.postPostagem(this.Postagem).subscribe((resp: postagem) => {
      this.Postagem = resp
      alert('Postagem realizada com sucesso!')
      this.Postagem = new postagem()
      this.getAllPostagens()
    })
  }

  temas(event: any){
    this.idTema = event.target.value
  }

}
