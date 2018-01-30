import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeExpect } from './resume-expect.model';
import { ResumeExpectService } from './resume-expect.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-expect',
    templateUrl: './resume-expect.component.html'
})
export class ResumeExpectComponent implements OnInit, OnDestroy {
resumeExpects: ResumeExpect[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeExpectService: ResumeExpectService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeExpectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeExpects = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeExpects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeExpect) {
        return item.id;
    }
    registerChangeInResumeExpects() {
        this.eventSubscriber = this.eventManager.subscribe('resumeExpectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
