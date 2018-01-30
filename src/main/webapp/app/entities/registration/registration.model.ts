import { BaseEntity } from './../../shared';

export class Registration implements BaseEntity {
    constructor(
        public id?: number,
        public recruitmentUuid?: string,
        public name?: string,
        public birthYear?: string,
        public highestDegree?: string,
        public researchField?: string,
        public workUnit?: string,
        public position?: string,
        public email?: string,
        public phone?: string,
        public homePage?: string,
        public resumeUrl?: string,
    ) {
    }
}
