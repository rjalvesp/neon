import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaBody } from '../types/ideas.types';

@Injectable({
  providedIn: 'root',
})
export class IdeasService {
  private entity = 'ideas';

  constructor(private readonly http: HttpClient) {}

  getAll(offset: number = 0, limit: number = 10) {
    return this.http.get<any>(this.entity, {
      params: new HttpParams().set('offset', offset).set('limit', limit),
    });
  }

  getById(id: string) {
    return this.http.get<any>(`${this.entity}/${id}`);
  }

  deleteById(id: string) {
    return this.http.delete(`${this.entity}/${id}`);
  }

  updateById(id: string, body: IdeaBody) {
    return this.http.put(`${this.entity}/${id}`, body);
  }

  create(body: IdeaBody) {
    return this.http.post(this.entity, body);
  }

  rateIdea(idIdea: string, body: { score: number }) {
    return this.http.post(`${this.entity}/${idIdea}/ratings`, body);
  }
}
