import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeEducation } from './resume-education.model';
import { ResumeEducationService } from './resume-education.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-education',
    templateUrl: './resume-education.component.html'
})
export class ResumeEducationComponent implements OnInit, OnDestroy {
	resumeEducations: ResumeEducation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeEducationService: ResumeEducationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeEducationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeEducations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeEducations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeEducation) {
        return item.id;
    }
    registerChangeInResumeEducations() {
        this.eventSubscriber = this.eventManager.subscribe('resumeEducationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
