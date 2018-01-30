import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Registration } from './registration.model';
import { RegistrationService } from './registration.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-registration',
    templateUrl: './registration.component.html',
    styleUrls: [
    	'registration.component.css'
    ]
})
export class RegistrationComponent implements OnInit, OnDestroy {
registrations: Registration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private registrationService: RegistrationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.registrationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.registrations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRegistrations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Registration) {
        return item.id;
    }
    registerChangeInRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe('registrationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
