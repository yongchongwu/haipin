import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ResumeBasic } from "../resume-basic/resume-basic.model";

@Injectable()
export class ResumeRouteAccessService implements CanActivate {

    constructor(private http: Http,private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        return this.checkHasResume();
    }
    checkHasResume(): Promise<boolean> {
        return this.http.get("api/resume/hasone").toPromise().then((res: Response) => {
            if(res['_body']==''){
                this.router.navigate(['new-resume'])
                return false
            }
            return true;
        });
    }

}
