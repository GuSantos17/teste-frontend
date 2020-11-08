import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.scss']
})
export class ClienteNovoComponent implements OnInit {

  clientForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      'nome' : [null, Validators.required],
      'sexo' : [null, Validators.required],
      'cep' : [null, Validators.required],
      'data_nascimento' : [null, Validators.required],
      'endereco' : [null, Validators.required],
      'complemento' : [null, Validators.required],
      'numero' : [null, Validators.required],
      'bairro' : [null, Validators.required],
      'cidade' : [null, Validators.required],
      'estado' : [null, Validators.required]
    });
  }

  addCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCliente(form)
    .subscribe(res => {
      //const id = res['id'];
      this.isLoadingResults = false;
      this.router.navigate(['/clientes']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  getCep(cep) {
    this.api.getCep(cep.value).subscribe(data => {
      this.clientForm.patchValue({
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      });
    });
  }
}
