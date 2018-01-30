import { BaseEntity } from './../../shared';

export class ResumeBlock implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public titleName?: string,
        public titleContent?: string,
    ) {
    }
}
