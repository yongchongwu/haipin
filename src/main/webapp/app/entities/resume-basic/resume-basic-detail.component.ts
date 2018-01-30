import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeBasic } from './resume-basic.model';
import { ResumeBasicService } from './resume-basic.service';

@Component({
    selector: 'jhi-resume-basic-detail',
    templateUrl: './resume-basic-detail.component.html'
})
export class ResumeBasicDetailComponent implements OnInit, OnDestroy {

    resumeBasic: ResumeBasic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeBasicService: ResumeBasicService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeBasics();
    }

    load(id) {
        this.resumeBasicService.find(id).subscribe((resumeBasic) => {
            this.resumeBasic = resumeBasic;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeBasics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeBasicListModification',
            (response) => this.load(this.resumeBasic.id)
        );
    }
}
