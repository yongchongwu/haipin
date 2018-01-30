import { BaseEntity } from './../../shared';

export class ResumeShowcase implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public title?: string,
        public content?: string,
        public imageUrl?: string,
        public cutImageUrl?: string,
        public url?: string,
    ) {
    }
}
