import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persoana } from '../persoana.model'; // Importă modelul de persoană

@Injectable({
  providedIn: 'root'
})
export class PersoaneService {
  private apiUrl = 'http://localhost:8080/api/persoane';

  constructor(private http: HttpClient) {}

  getPersoane(): Observable<Persoana[]> {
    return this.http.get<Persoana[]>(this.apiUrl);
  }

  adaugaPersoana(persoana: Persoana): Observable<Persoana> {
    return this.http.post<Persoana>(this.apiUrl, persoana);
  }

  stergePersoana(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  modificaPersoana(id: number, persoana: Persoana): Observable<Persoana> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Persoana>(url, persoana);
  }


  getPersoana(id: number): Observable<Persoana> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Persoana>(url);
  }
}
