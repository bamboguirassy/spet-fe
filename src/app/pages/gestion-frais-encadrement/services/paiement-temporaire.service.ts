import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class PaiementTemporaireService {

//   constructor() { }
// }
@Injectable({
  providedIn: 'root'
})
export class PaiementTemporaireService {

  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  getPaymentDetails(transactionId: string): Observable<any> {
    const url = `${this.apiUrl}/get-paiement-information/${transactionId}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        return response; 
      })
    );
  }

}
