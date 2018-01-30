import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { ResumeProject } from './resume-project.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResumeProjectService {

    private resourceUrl = 'api/resume/projects';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(resumeProject: ResumeProject, format:boolean): Observable<ResumeProject> {
        const copy = this.convert(resumeProject);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            format?this.convertItemFromServer(jsonResponse):console.log("不需要格式化时间");
            return jsonResponse;
        });
    }

    update(resumeProject: ResumeProject, format:boolean): Observable<ResumeProject> {
        const copy = this.convert(resumeProject);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            format?this.convertItemFromServer(jsonResponse):console.log("不需要格式化时间");
            return jsonResponse;
        });
    }

    find(id: number): Observable<ResumeProject> {
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

    private convert(resumeProject: ResumeProject): ResumeProject {
        const copy: ResumeProject = Object.assign({}, resumeProject);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(resumeProject.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(resumeProject.endDate);
        return copy;
    }
}
