import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Cliente } from 'src/model/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'data_nascimento', 'sexo', 'cep', 'acao'];
  dataSource: Cliente[];
  isLoadingResults = false;
  
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getClientes()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }

}
