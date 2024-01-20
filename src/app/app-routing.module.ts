import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
import { MeusPedidosComponent } from './components/meus-pedidos/meus-pedidos.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { SacolaPedidoComponent } from './components/template/pedido/sacola-pedido/sacola-pedido/sacola-pedido.component';
import { ProdutoPedidoComponent } from './components/template/pedido/produto-pedido/produto-pedido.component';
import { PagamentoPedidoComponent } from './components/template/pedido/pagamento-pedido/pagamento-pedido.component';
import { AguardarPedidoComponent } from './components/template/pedido/aguardar-pedido/aguardar-pedido.component';
import { PedidoAceitoComponent } from './components/template/pedido/pedido-aceito/pedido-aceito.component';
import { AuthGuard } from './components/guards/auth.guard';
import { DetalheMeusPedidosComponent } from './components/template/meus-pedidos/detalhe-meus-pedidos/detalhe-meus-pedidos.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'buscar', component: BuscarComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'minha_conta', component: MinhaContaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'meus_pedidos', component: MeusPedidosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'detalhe_meus_pedidos', component: DetalheMeusPedidosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'pedido', component: PedidoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'sacola', component: SacolaPedidoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'produto', component: ProdutoPedidoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'pagamento', component: PagamentoPedidoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'aguardar', component: AguardarPedidoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'pedido_aceito', component: PedidoAceitoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
