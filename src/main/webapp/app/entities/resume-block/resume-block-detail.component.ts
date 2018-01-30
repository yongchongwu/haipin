import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeBlock } from './resume-block.model';
import { ResumeBlockService } from './resume-block.service';

@Component({
    selector: 'jhi-resume-block-detail',
    templateUrl: './resume-block-detail.component.html'
})
export class ResumeBlockDetailComponent implements OnInit, OnDestroy {

    resumeBlock: ResumeBlock;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeBlockService: ResumeBlockService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeBlocks();
    }

    load(id) {
        this.resumeBlockService.find(id).subscribe((resumeBlock) => {
            this.resumeBlock = resumeBlock;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeBlocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeBlockListModification',
            (response) => this.load(this.resumeBlock.id)
        );
    }
}
