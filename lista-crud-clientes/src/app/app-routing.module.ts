import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ClienteNovoComponent } from './cliente-novo/cliente-novo.component';
import { ClienteEditarComponent } from './cliente-editar/cliente-editar.component';

const routes: Routes = [
{
  path: 'clientes',
  component: ClientesComponent,
  data: { title: 'Lista de Clientes' }
},
{
  path: 'cliente-detalhe/:id',
  component: ClienteDetalheComponent,
  data: { title: 'Detalhe do Cliente' }
},
{
  path: 'cliente-novo',
  component: ClienteNovoComponent,
  data: { title: 'Adicionar Cliente' }
},
{
  path: 'cliente-editar/:id',
  component: ClienteEditarComponent,
  data: { title: 'Editar o Cliente'}
},
{
  path: '',
  redirectTo: '/clientes',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
