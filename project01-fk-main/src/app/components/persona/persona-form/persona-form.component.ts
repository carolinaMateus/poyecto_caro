import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../models/persona';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnInit {
  form!: FormGroup;
  dto: Persona;
  mode: string | undefined;
  titulo: string = '';
  patternCorreo = /\S+@\S+\.\S+/;
  disabled = false;
  errors: { [key: string]: Array<string> } = {};
  constructor(private dialogRef: MatDialogRef<PersonaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: PersonaService) {
    this.dto = new Persona({});
    if (data) {
      if (data.dto) {
        this.dto = new Persona(data.dto);
      }
      if (data.mode) {
        this.mode = data.mode;
        this.disabled = this.mode === 'delete' || this.mode === 'read';

        this.titulo = data.mode === 'add' ? 'Crear Persona' : data.mode === 'edit' ? 'Editar Persona' : data.mode === 'read' ? 'Ver Persona' : 'Elminiar Persona';
      }
    }
    this.form = this.fb.group({
      nombres: [{ value: this.dto.nombres, disabled: this.disabled }, [Validators.required]],
      apellidos: [{ value: this.dto.apellidos, disabled: this.disabled }, [Validators.required]],
      correo: [{ value: this.dto.correo, disabled: this.disabled }, [Validators.required, Validators.pattern(this.patternCorreo)]]
    });
  }

  ngOnInit(): void {
  }

  save() {
    this.service.addPeople(this.dto).subscribe(() => {
      this.dialogRef.close({ isError: false, message: "Persona creada correctamente" });
    }, err => {
      this.errors = err?.error?.errors;
      for (let error in this.errors) {
        var formControlName: string = error.charAt(0).toLowerCase() + error.slice(1);
        this.form.controls[formControlName].setErrors({ api: true });
        this.form.controls[formControlName].markAsTouched();
      }
    });
  }
  edit() {
    this.service.updatePeople(this.dto).subscribe(() => {
      this.dialogRef.close({ isError: false, message: "Persona actualizada correctamente" });
    }, err => {
      this.errors = err?.error?.errors;
      for (let error in this.errors) {
        var formControlName: string = error.charAt(0).toLowerCase() + error.slice(1);
        this.form.controls[formControlName].setErrors({ api: true });
        this.form.controls[formControlName].markAsTouched();
      }
    });
  }

  delete() {
    this.service.deletePeople(this.dto.id).subscribe(() => {
      this.dialogRef.close({ isError: false, message: "Persona eliminada correctamente" });
    }, err => {

    });
  }

  close() {
    this.dialogRef.close({ isError: false, message: undefined });
  }
}
