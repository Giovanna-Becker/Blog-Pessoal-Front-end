import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastrarComponent } from "./cadastrar/cadastrar.component";
import { TemaDelecaoComponent } from "./delecao/tema-delecao/tema-delecao.component";
import { TemaEdicaoComponent } from "./edicao/tema-edicao/tema-edicao.component";
import { EntrarComponent } from "./entrar/entrar.component";
import { InicioComponent } from "./inicio/inicio.component";
import { TemaComponent } from "./tema/tema.component";

const routes: Routes = [
    {path:'', redirectTo:'entrar', pathMatch:'full'},

    {path:'entrar', component:EntrarComponent},
    {path:'cadastrar', component:CadastrarComponent},

    {path:'inicio', component:InicioComponent},
    {path:'tema', component:TemaComponent},
    {path:'tema-edicao/:id', component:TemaEdicaoComponent},
    {path:'tema-delecao/:id', component:TemaDelecaoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }