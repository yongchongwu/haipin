import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeShowcase } from './resume-showcase.model';
import { ResumeShowcaseService } from './resume-showcase.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-showcase',
    templateUrl: './resume-showcase.component.html'
})
export class ResumeShowcaseComponent implements OnInit, OnDestroy {
resumeShowcases: ResumeShowcase[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeShowcaseService: ResumeShowcaseService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeShowcaseService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeShowcases = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeShowcases();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeShowcase) {
        return item.id;
    }
    registerChangeInResumeShowcases() {
        this.eventSubscriber = this.eventManager.subscribe('resumeShowcaseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
