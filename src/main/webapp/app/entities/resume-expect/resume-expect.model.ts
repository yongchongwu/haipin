import { BaseEntity } from './../../shared';

export class ResumeExpect implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public positionName?: string,
        public positionType?: string,
        public city?: string,
        public salarys?: string,
        public addExplain?: string,
    ) {
    }
}
