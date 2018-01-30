import { BaseEntity } from './../../shared';

export class ResumeIntro implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public content?: string,
    ) {
    }
}
