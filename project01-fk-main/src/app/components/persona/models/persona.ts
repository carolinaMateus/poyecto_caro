export class Persona {

  public id: string | undefined;
  public nombres: string | undefined;
  public apellidos: string | undefined;
  public correo: string | undefined;


  constructor(_parameters: any) {
    this.id = (_parameters?.id != null ? _parameters.id : undefined);
    this.nombres = (_parameters?.nombres != null ? _parameters.nombres : undefined);
    this.apellidos = (_parameters?.apellidos != null ? _parameters.apellidos: undefined);
    this.correo = (_parameters?.correo != null ? _parameters.correo: undefined);
  }
}
