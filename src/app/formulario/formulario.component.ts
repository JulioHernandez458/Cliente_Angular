import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent implements OnInit {

  idPersona: number;
  nombreInput: string;
  apellidoInput: string;
  emailInput: string;
  telInput: string;

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.idPersona = this.route.snapshot.params.idPersona;
    console.log('recuperamos el parametro idPersona:' + this.idPersona);
    if(this.idPersona != null){
      const persona = this.personaService.encontrarPersona(this.idPersona);
      if(persona != null){
        this.nombreInput = persona.nombre;
        this.apellidoInput = persona.apellido;
        this.emailInput = persona.email;
        this.telInput = persona.telefono;
      }
    }

  }

  onGuardarPersona(){
    const personaAGuardar = new Persona(this.idPersona, this.nombreInput, this.apellidoInput,
                            this.emailInput, this.telInput);
    if(this.idPersona != null){
      this.personaService.modificarPersona(this.idPersona, personaAGuardar);
    }
    else{
      this.personaService.agregarPersona(personaAGuardar);
    }
    this.router.navigate(['personas']);
  }

  onEliminarPersona(){
    if(this.idPersona != null){
      console.log('persona a eliminar:' + this.idPersona);
      this.personaService.eliminarPersona(this.idPersona);
    }
    this.router.navigate(['personas']);
  }

}
