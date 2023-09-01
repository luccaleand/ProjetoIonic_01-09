import { Component, OnInit } from '@angular/core';
import { Produtos } from '../model/produto.model';
import { DatabaseService } from '../servico/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /* Atributos para cima */
  titulo = 'ShoppingList';
  imagem = 'https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_640.jpg';

  /* Array do ngFor */
  /* Produtos é o meu molde */
  minhaLista: Produtos[] = [];

  /* Métodos para baixo */
  constructor(
    /* Nosso serviço de banco de dados */
    private bancoDados: DatabaseService,

    /*fazer a injeção do Método - private (nome da variavel)(nome da ferramenta)*/
    /* para criar uma classe lembre do - parente que vê() chaves{} ex:  */


    /*VOU FAZER UM CARREGANDO */
    private loadcontrol: LoadingController
  ) { }

  ngOnInit(): void {
    /*Inicia o carregando*/
    this.carregando();

    /* consulta os dados na webAPI */
    this.bancoDados.consulta().subscribe(result => this.minhaLista = result)
  }

  /* Método do carregando  */
  async carregando() {
    const load = this.loadcontrol.create({
      mode: 'ios',
      message: 'Aguarde...',
      duration: 2000
    });
    (await load).present();
  }

  
  excluirButton(id:any){
    /* Usando o metodo de cadastro do nosso serviço */
    this.bancoDados.excluir(id);
    setTimeout(this.refres, 2000);
  }
  editarButton(id:any){
    /* Usando o metodo de cadastro do nosso serviço */
    this.bancoDados.editar(id);
    setTimeout(this.refres, 2000);
  }


  refres(){
    location.reload();
  }
}


