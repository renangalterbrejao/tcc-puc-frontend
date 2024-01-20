import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPrincipalComponent } from './components/template/principal/header-principal/headerPrincipal.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { FooterPrincipalComponent } from './components/template/principal/footer-principal/footer-principal.component';
import { MainPrincipalComponent } from './components/template/principal/main-principal/main-principal.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { HeaderBuscarComponent } from './components/template/buscar/header-buscar/header-buscar.component';
import { MainBuscarComponent } from './components/template/buscar/main-buscar/main-buscar.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
import { HeaderMinhaContaComponent } from './components/template/minha-conta/header-minha-conta/header-minha-conta.component';
import { MainMinhaContaComponent } from './components/template/minha-conta/main-minha-conta/main-minha-conta.component';
import { MeusPedidosComponent } from './components/meus-pedidos/meus-pedidos.component';
import { HeaderMeusPedidosComponent } from './components/template/meus-pedidos/header-meus-pedidos/header-meus-pedidos.component';
import { MainMeusPedidosComponent } from './components/template/meus-pedidos/main-meus-pedidos/main-meus-pedidos.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { HeaderPedidoComponent } from './components/template/pedido/header-pedido/header-pedido.component';
import { MainPedidoComponent } from './components/template/pedido/main-pedido/main-pedido.component';
import { SacolaPedidoComponent } from './components/template/pedido/sacola-pedido/sacola-pedido/sacola-pedido.component';
import { ProdutoPedidoComponent } from './components/template/pedido/produto-pedido/produto-pedido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagamentoPedidoComponent } from './components/template/pedido/pagamento-pedido/pagamento-pedido.component';
import { AguardarPedidoComponent } from './components/template/pedido/aguardar-pedido/aguardar-pedido.component';
import { PedidoAceitoComponent } from './components/template/pedido/pedido-aceito/pedido-aceito.component';
import { ModalSimplesComponent } from './components/template/modais/modal-simples/modal-simples.component';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LoginService } from './components/login/login.service';
import { DetalheMeusPedidosComponent } from './components/template/meus-pedidos/detalhe-meus-pedidos/detalhe-meus-pedidos.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderPrincipalComponent,
    IndexComponent,
    LoginComponent,
    PrincipalComponent,
    FooterPrincipalComponent,
    MainPrincipalComponent,
    BuscarComponent,
    HeaderBuscarComponent,
    MainBuscarComponent,
    MinhaContaComponent,
    HeaderMinhaContaComponent,
    MainMinhaContaComponent,
    MeusPedidosComponent,
    HeaderMeusPedidosComponent,
    MainMeusPedidosComponent,
    PedidoComponent,
    HeaderPedidoComponent,
    MainPedidoComponent,
    SacolaPedidoComponent,
    ProdutoPedidoComponent,
    PagamentoPedidoComponent,
    AguardarPedidoComponent,
    PedidoAceitoComponent,
    ModalSimplesComponent,
    DetalheMeusPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
