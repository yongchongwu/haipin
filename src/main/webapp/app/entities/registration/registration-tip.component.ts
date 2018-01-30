import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

@Component({
    templateUrl: './registration-tip.component.html',
    styleUrls: [
    	'registration-tip.component.css'
    ]
})
export class RegistrationTipComponent implements OnInit, OnDestroy {

	constructor(
        private router: Router,
        private alertService: JhiAlertService
    ) {
    }
	ngOnInit() {

	}
    ngOnDestroy() {

    }

    goToHome() {
        this.router.navigate(['/']);
    }

    registerChangeInRegistrations() {

    }
    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
