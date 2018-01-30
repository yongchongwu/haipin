import { BaseEntity, User } from './../../shared';

export class Card implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public highestDegree?: string,
        public researchField?: string,
        public email?: string,
        public phone?: string,
        public workUnit?: string,
        public position?: string,
        public city?: string,
        public user?: User,
    ) {
    }
}
