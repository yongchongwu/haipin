//引用外部资源
import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

//引入总的类
import { DataSearch } from './data-search.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
//引入md5
import { Md5 } from "ts-md5/dist/md5";

@Injectable()
export class DataSearchService {

//变量声明
	//页面初始化时请求数据的api
    private entryUrl = 'api/professors/entry';
    //下拉单多级联动api
    private selectUrl = 'api/professors/bucket';
    //点击检索时将构建好的json提交查询的api
	private searchUrl = 'api/professors/search';
	//点击某一条搜索结果时对应的该学者详情信息api
	private detailUrl = 'api/professors/detail';
	//模糊检索翻译
	private translateUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate';

//依赖注入
    constructor(
    	private http: Http,
    	private jsonp: Jsonp
    ) {
    }

	//页面初始化时查询数据
    query(): Observable<DataSearch> {
        const copy = {"size": 10};
        return this.http.post(this.entryUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

	//下拉单多级联动
	_change(bucket_name: any,parent_name: any,parent_value: any): Observable<DataSearch> {
        const copy = {
					  "bucket_name": bucket_name,
					  "parent_name": parent_name,
					  "parent_value": parent_value
					};
        return this.http.post(this.selectUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    } 

	//检索
	_search(search_data) {
		return this.http.post(this.searchUrl, search_data).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
	}

	//学者详情信息
	find_detail(id: number) {
		return this.http.get(`${this.detailUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
	}

	//翻译
	_translate(keyword) {
		let me = this;
		let appid = '20170822000075722';
        let key = 'Ww4qy286hL363gB1sQoT';
        let salt = (new Date).getTime();
        let sign = Md5.hashStr(appid + keyword + salt + key);
		let params = new URLSearchParams();
		params.set('q',''+keyword);
		params.set('from','zh');
		params.set('to','en');
		params.set('appid',''+appid);
		params.set('salt',''+salt);
		params.set('sign',''+sign);
		params.set('callback', 'JSONP_CALLBACK');
		return this.jsonp.get(this.translateUrl,{search: params}).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
	}

}
