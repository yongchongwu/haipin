import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeWork } from './resume-work.model';
import { ResumeWorkService } from './resume-work.service';

@Component({
    selector: 'jhi-resume-work-detail',
    templateUrl: './resume-work-detail.component.html'
})
export class ResumeWorkDetailComponent implements OnInit, OnDestroy {

    resumeWork: ResumeWork;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeWorkService: ResumeWorkService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeWorks();
    }

    load(id) {
        this.resumeWorkService.find(id).subscribe((resumeWork) => {
            this.resumeWork = resumeWork;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeWorks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeWorkListModification',
            (response) => this.load(this.resumeWork.id)
        );
    }
}
