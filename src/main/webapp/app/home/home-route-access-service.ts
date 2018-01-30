import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Principal} from "../shared";

@Injectable()
export class HomeRouteAccessService implements CanActivate {

    constructor(private router: Router,
                private principal: Principal) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
        | Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {
            if (account && principal.hasAnyAuthorityDirect(['ROLE_HRM'])) {
                this.router.navigate(['data-search'])
                return false;
            }
            return true;
        }));
    }

}
