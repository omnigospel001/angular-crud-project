import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http.get<any>('http://localhost:3000/formValues/')
    .pipe(map((res: any) =>{
      return res;
    }))
     
  }

  postEmployees(data: any) {
    return this.http.post<any>('http://localhost:3000/formValues/', data).pipe(map((res: any) =>{
      return res;
    }))
  }

  updateEmployees(id: number | undefined, data: any) {
    return this.http.put<any>('http://localhost:3000/formValues/'+id, data).pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteEmployees(id: number) {
    return this.http.delete<any>('http://localhost:3000/formValues/'+id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}