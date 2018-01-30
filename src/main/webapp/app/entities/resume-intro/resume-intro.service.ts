import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ResumeIntro } from './resume-intro.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResumeIntroService {

    private resourceUrl = 'api/resume/intros';

    constructor(private http: Http) { }

    create(resumeIntro: ResumeIntro): Observable<ResumeIntro> {
        const copy = this.convert(resumeIntro);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(resumeIntro: ResumeIntro): Observable<ResumeIntro> {
        const copy = this.convert(resumeIntro);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ResumeIntro> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(resumeIntro: ResumeIntro): ResumeIntro {
        const copy: ResumeIntro = Object.assign({}, resumeIntro);
        return copy;
    }
}
