import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeShowcase } from './resume-showcase.model';
import { ResumeShowcaseService } from './resume-showcase.service';

@Component({
    selector: 'jhi-resume-showcase-detail',
    templateUrl: './resume-showcase-detail.component.html'
})
export class ResumeShowcaseDetailComponent implements OnInit, OnDestroy {

    resumeShowcase: ResumeShowcase;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeShowcaseService: ResumeShowcaseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeShowcases();
    }

    load(id) {
        this.resumeShowcaseService.find(id).subscribe((resumeShowcase) => {
            this.resumeShowcase = resumeShowcase;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeShowcases() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeShowcaseListModification',
            (response) => this.load(this.resumeShowcase.id)
        );
    }
}
