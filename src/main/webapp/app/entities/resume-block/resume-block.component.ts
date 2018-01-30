import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeBlock } from './resume-block.model';
import { ResumeBlockService } from './resume-block.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-block',
    templateUrl: './resume-block.component.html'
})
export class ResumeBlockComponent implements OnInit, OnDestroy {
resumeBlocks: ResumeBlock[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeBlockService: ResumeBlockService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeBlockService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeBlocks = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeBlocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeBlock) {
        return item.id;
    }
    registerChangeInResumeBlocks() {
        this.eventSubscriber = this.eventManager.subscribe('resumeBlockListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
