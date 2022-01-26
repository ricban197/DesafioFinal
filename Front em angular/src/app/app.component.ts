import { Clientes } from './models/clientes';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from './services/clientes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  vazio!:  string;
  cli = {} as Clientes;
  clis!: Clientes[];
  index = {} as Clientes;
  constructor(private clientesService: ClientesService) {}
  
  ngOnInit() {
    this.getClientes();
  }

  // defini se um cliente será criado ou atualizado
  saveCliente(form: NgForm) {
    if (this.cli.id !== undefined) {
      this.clientesService.updateCliente(this.cli).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clientesService.saveCliente(this.cli).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  verCliente(cli: Clientes){

       this.index = cli;
     
  }

  // Chama o serviço para obtém todos os clientes
  getClientes() {
    this.clientesService.getClientes().subscribe((clis: Clientes[]) => {
      this.clis = clis;     
    });
  }

  // deleta um cliente
  deleteCliente(cli: Clientes) {
    this.clientesService.deleteCliente(cli).subscribe(() => {
      this.getClientes();
    });
  }

  // copia o cliente para ser editado.
  editCliente(cli: Clientes) {
    cli.numero="";
    this.cli = cli;
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    this.cli = {} as Clientes;
  }

}