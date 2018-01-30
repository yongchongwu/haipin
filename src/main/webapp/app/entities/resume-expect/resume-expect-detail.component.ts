import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeExpect } from './resume-expect.model';
import { ResumeExpectService } from './resume-expect.service';

@Component({
    selector: 'jhi-resume-expect-detail',
    templateUrl: './resume-expect-detail.component.html'
})
export class ResumeExpectDetailComponent implements OnInit, OnDestroy {

    resumeExpect: ResumeExpect;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeExpectService: ResumeExpectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeExpects();
    }

    load(id) {
        this.resumeExpectService.find(id).subscribe((resumeExpect) => {
            this.resumeExpect = resumeExpect;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeExpects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeExpectListModification',
            (response) => this.load(this.resumeExpect.id)
        );
    }
}
