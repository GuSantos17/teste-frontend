import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormControlName } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})

export class ClienteEditarComponent implements OnInit {

  _id: String = '';
  clientForm: FormGroup;
  nome: String = '';
  data_nascimento: String = '';
  sexo: String = '';
  cep: String = '';
  endereco: String = '';
  numero: number = null;
  complemento: String = '';
  bairro: String = '';
  cidade: String = '';
  estado: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCliente(this.route.snapshot.params['id']);
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

  getCliente(id) {
    this.api.getCliente(id).subscribe(data => {
      this._id = data.id_cliente;
      this.clientForm.patchValue({
        nome: data.nome,
        data_nascimento: data.data_nascimento,
        sexo: data.sexo,
        cep: data.cep,
        endereco: data.endereco,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado
      });
    });
  }

  updateCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCliente(this._id, form)
    .subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/cliente-detalhe/' + this._id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

}
