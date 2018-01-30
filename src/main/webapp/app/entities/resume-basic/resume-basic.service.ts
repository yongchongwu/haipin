import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ResumeBasic } from './resume-basic.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResumeBasicService {

    private resourceUrl = 'api/resume/basics';

    constructor(private http: Http) { }

    create(resumeBasic: ResumeBasic): Observable<ResumeBasic> {
        const copy = this.convert(resumeBasic);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(resumeBasic: ResumeBasic): Observable<ResumeBasic> {
        const copy = this.convert(resumeBasic);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ResumeBasic> {
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

    private convert(resumeBasic: ResumeBasic): ResumeBasic {
        const copy: ResumeBasic = Object.assign({}, resumeBasic);
        return copy;
    }
}
