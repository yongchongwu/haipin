import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeIntro } from './resume-intro.model';
import { ResumeIntroService } from './resume-intro.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-intro',
    templateUrl: './resume-intro.component.html'
})
export class ResumeIntroComponent implements OnInit, OnDestroy {
resumeIntros: ResumeIntro[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeIntroService: ResumeIntroService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeIntroService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeIntros = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeIntros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeIntro) {
        return item.id;
    }
    registerChangeInResumeIntros() {
        this.eventSubscriber = this.eventManager.subscribe('resumeIntroListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
