import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeEducation } from './resume-education.model';
import { ResumeEducationService } from './resume-education.service';

@Component({
    selector: 'jhi-resume-education-detail',
    templateUrl: './resume-education-detail.component.html'
})
export class ResumeEducationDetailComponent implements OnInit, OnDestroy {

    resumeEducation: ResumeEducation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeEducationService: ResumeEducationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeEducations();
    }

    load(id) {
        this.resumeEducationService.find(id).subscribe((resumeEducation) => {
            this.resumeEducation = resumeEducation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeEducations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeEducationListModification',
            (response) => this.load(this.resumeEducation.id)
        );
    }
}
