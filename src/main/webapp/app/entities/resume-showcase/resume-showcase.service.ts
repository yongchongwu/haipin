import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ResumeShowcase } from './resume-showcase.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResumeShowcaseService {

    private resourceUrl = 'api/resume/showcases';

    constructor(private http: Http) { }

    create(resumeShowcase: ResumeShowcase): Observable<ResumeShowcase> {
        const copy = this.convert(resumeShowcase);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(resumeShowcase: ResumeShowcase): Observable<ResumeShowcase> {
        const copy = this.convert(resumeShowcase);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ResumeShowcase> {
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

    private convert(resumeShowcase: ResumeShowcase): ResumeShowcase {
        const copy: ResumeShowcase = Object.assign({}, resumeShowcase);
        return copy;
    }
}
