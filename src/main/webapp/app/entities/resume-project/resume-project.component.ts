import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeProject } from './resume-project.model';
import { ResumeProjectService } from './resume-project.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-project',
    templateUrl: './resume-project.component.html'
})
export class ResumeProjectComponent implements OnInit, OnDestroy {
resumeProjects: ResumeProject[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeProjectService: ResumeProjectService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeProjectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeProjects = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeProjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeProject) {
        return item.id;
    }
    registerChangeInResumeProjects() {
        this.eventSubscriber = this.eventManager.subscribe('resumeProjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
