/**
 * Created by Administrator on 2017/7/31.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { ResponseWrapper, createRequestOption } from '../../shared';
import { ResumeBasic } from './../resume-basic/resume-basic.model';
import { ResumeWork } from './../resume-work/resume-work.model';
import { logsRoute } from "./../../admin/logs/logs.route";
import { ResumeProject } from './../resume-project/resume-project.model';

@Injectable()
export class MyresumeService {

    constructor(private http: Http) {
    }

    info(resumeBasicA: ResumeBasic): Observable<ResumeBasic> {
        const copy = this.convert(resumeBasicA);
        return this.http.put("api/resume/basics", copy).map((res: Response) => {
            return res.json();
        });
    }

    private convert(obj: any): ResumeBasic {
        const copy = (<any>Object).assign({}, obj);
        return copy;
    }

    getAllInfo(): Observable<ResumeBasic> {
        return this.http.get("api/resume/my").map((res: Response) => {
            return res.json();
        });
    }

    addWork(resumeWork: ResumeWork): Observable<ResumeWork> {
        const copy = this.convert(resumeWork);
        return this.http.post("api/resume/works", copy).map((res: Response) => {
            return res.json();
        });
    }

}
