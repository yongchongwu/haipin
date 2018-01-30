import { ITEMS_PER_PAGE, ITEMS_PER_PAGE_SEARCH } from '../../shared';
import { Injectable } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

//用户管理页分页组件配置参数
@Injectable()
export class PaginationConfig {
    constructor(private config: NgbPaginationConfig) {
        config.boundaryLinks = true;
        config.maxSize = 3;
        config.pageSize = ITEMS_PER_PAGE;
        config.size = 'sm';
    }
}

//Eol搜索页分页组件配置参数
@Injectable()
export class PaginationConfigSearch {
    constructor(private config: NgbPaginationConfig) {
        config.boundaryLinks = true;
        //初始位置最多到哪一页
        config.maxSize = 6;
        //每页显示的条数
        config.pageSize = ITEMS_PER_PAGE_SEARCH;
        //组件大小"sm|lg",不写就默认是中等大小
    }
}