import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Cliente } from 'src/model/cliente';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})
export class ClienteDetalheComponent implements OnInit {

  cliente: Cliente = { id_cliente: '', nome: '', sexo: '', data_nascimento: '', cep: '', bairro: '',
    cidade: '', complemento: '', endereco: '', estado: '', numero: '' }
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.getCliente(this.route.snapshot.params['id']);
  }

  getCliente(id_cliente) {
    this.api.getCliente(id_cliente)
      .subscribe(data => {
        this.cliente = data;
        console.log(this.cliente);
        this.isLoadingResults = false;
      });
  } 

  deleteCliente(id_cliente){
    this.isLoadingResults = true;
    this.api.deleteCliente(id_cliente)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/clientes']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }); 
  }
}
