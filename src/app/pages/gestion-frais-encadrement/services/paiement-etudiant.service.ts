import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaiementEtudiantService {

  constructor(private http : HttpClient, private tokenManager : TokenManagerService) { }
  
  // private urlPrefixe = 'http://127.0.0.1:8000/api';
  private urlPrefixe = 'http://127.0.0.1:8000/api';
  token : string
  getStatus(inscriptionId: number): Observable<any> {
    this.token = this.tokenManager.getToken();

    // Remplacez "{inscription_id}" par l'identifiant d'inscription réel
    const url = `http://127.0.0.1:8000/api/get-paiement-details/${inscriptionId}?token=${this.token}`;
    console.log(this.token)

    // Définir les en-têtes avec le jeton d'authentification
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    // Effectuer la requête HTTP en utilisant l'URL et les en-têtes
    return this.http.get<any>(url, { headers });
  }
}
