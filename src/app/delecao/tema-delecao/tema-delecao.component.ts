import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { tema } from 'src/app/model/tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delecao',
  templateUrl: './tema-delecao.component.html',
  styleUrls: ['./tema-delecao.component.css']
})
export class TemaDelecaoComponent implements OnInit {

  Tema: tema = new tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute 
    ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: tema) => {
      this.Tema = resp
    })
  }

  apagar(){
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
