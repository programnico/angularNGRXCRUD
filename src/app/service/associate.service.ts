import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associates } from '../Store/Model/Associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  baseurl = 'http://localhost:3000/associate';

  constructor(private http: HttpClient) {
    
   }

  getAll(){
    return this.http.get<Associates[]>(this.baseurl);
  }

  getByCode(code:number){
    return this.http.get<Associates>(this.baseurl+'/'+code);
  }

  delete(code:number){
    return this.http.delete(this.baseurl+'/'+code);
  }

  update(data: Associates){
    return this.http.put(this.baseurl+'/'+data.id, data);
  }

  create(data: Associates){
    return this.http.post(this.baseurl, data);
  }


}
