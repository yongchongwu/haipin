import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResumeSkill } from './resume-skill.model';
import { ResumeSkillService } from './resume-skill.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resume-skill',
    templateUrl: './resume-skill.component.html'
})
export class ResumeSkillComponent implements OnInit, OnDestroy {
resumeSkills: ResumeSkill[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resumeSkillService: ResumeSkillService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resumeSkillService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resumeSkills = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResumeSkills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResumeSkill) {
        return item.id;
    }
    registerChangeInResumeSkills() {
        this.eventSubscriber = this.eventManager.subscribe('resumeSkillListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
