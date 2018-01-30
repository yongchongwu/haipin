import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeWork } from './resume-work.model';
import { ResumeWorkService } from './resume-work.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-work',
    templateUrl: './resume-work.component.html'
})
export class ResumeWorkComponent implements OnInit, OnDestroy {
resumeWorks: ResumeWork[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeWorkService: ResumeWorkService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeWorkService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeWorks = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeWorks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeWork) {
        return item.id;
    }
    registerChangeInResumeWorks() {
        this.eventSubscriber = this.eventManager.subscribe('resumeWorkListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
