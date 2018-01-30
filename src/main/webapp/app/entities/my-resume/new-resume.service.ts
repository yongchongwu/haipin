import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { ResumeBasic} from './../resume-basic/resume-basic.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MyresumeFirstService {
	
    private resourceUrl = 'api/resume/basics';
    
    constructor(private http: Http) {}
    
    resu(resumeBasic: ResumeBasic): Observable < ResumeBasic > {
        const copy = this.convert(resumeBasic);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }
    
    private convert(resumeBasic: ResumeBasic): ResumeBasic {
        const copy: ResumeBasic = Object.assign({}, resumeBasic);
        return copy;
    }
}
