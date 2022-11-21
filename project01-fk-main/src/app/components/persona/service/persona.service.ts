import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private API_URL!: string;
  constructor(private httpClient: HttpClient) { 
    this.API_URL = environment.api.baseUrl + environment.api.persona.persona;
  }

  getAllPeople() :Observable<Persona>{
    return this.httpClient.get<Persona>(this.API_URL);
  }

  getPeopleById(id:number) :Observable<Persona>{
    return this.httpClient.get<Persona>(this.API_URL+`/${id}`);
  }

  addPeople(persona: Persona) :Observable<any>{
    return this.httpClient.post<any>(this.API_URL, persona);
  }
  updatePeople(persona: Persona) :Observable<any>{
    return this.httpClient.put<any>(this.API_URL+`/${persona.id}`, persona);
  }

  deletePeople(id: any) :Observable<any>{
    return this.httpClient.delete<any>(this.API_URL+`/${id}`);
  }
}
