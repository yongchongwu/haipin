import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { ResumeWork } from './resume-work.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResumeWorkService {

    private resourceUrl = 'api/resume/works';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(resumeWork: ResumeWork, format: boolean): Observable<ResumeWork> {
        const copy = this.convert(resumeWork);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            format?this.convertItemFromServer(jsonResponse):console.log('不需要格式化时间');
            return jsonResponse;
        });
    }

    update(resumeWork: ResumeWork, format: boolean): Observable<ResumeWork> {
        const copy = this.convert(resumeWork);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            format?this.convertItemFromServer(jsonResponse):console.log('不需要格式化时间');
            return jsonResponse;
        });
    }

    find(id: number): Observable<ResumeWork> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startDate = this.dateUtils
            .convertLocalDateFromServer(entity.startDate);
        entity.endDate = this.dateUtils
            .convertLocalDateFromServer(entity.endDate);
    }

    private convert(resumeWork: ResumeWork): ResumeWork {
        const copy: ResumeWork = Object.assign({}, resumeWork);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(resumeWork.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(resumeWork.endDate);
        return copy;
    }
}
