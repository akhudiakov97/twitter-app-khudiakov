import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TweetsResponse } from '@app/shared/models/tweets-response.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private rootUrl = 'https://cors-anywhere.herokuapp.com/https://anymind-recruitment-python-backend.adasia.biz';

  constructor(private http: HttpClient) {
  }

  getTweetsByHashTag(hashtag: string): Observable<TweetsResponse> {
    return this.http.get<TweetsResponse>(`${this.rootUrl}/hashtags/${hashtag}`);
  }

  getTweetsByUser(user: string): Observable<TweetsResponse> {
    return this.http.get<TweetsResponse>(`${this.rootUrl}/users/${user}`);
  }
}
