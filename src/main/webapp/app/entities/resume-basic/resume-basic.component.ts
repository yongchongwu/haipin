import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeBasic } from './resume-basic.model';
import { ResumeBasicService } from './resume-basic.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-basic',
    templateUrl: './resume-basic.component.html'
})
export class ResumeBasicComponent implements OnInit, OnDestroy {
resumeBasics: ResumeBasic[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeBasicService: ResumeBasicService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeBasicService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeBasics = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeBasics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeBasic) {
        return item.id;
    }
    registerChangeInResumeBasics() {
        this.eventSubscriber = this.eventManager.subscribe('resumeBasicListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
