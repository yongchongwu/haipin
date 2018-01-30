import { BaseEntity } from './../../shared';

export class ResumeEducation implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public schoolName?: string,
        public major?: string,
        public degree?: string,
        public endYear?: string,
    ) {
    }
}
