import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {Http, RequestOptions, RequestOptionsArgs, Response, Headers} from '@angular/http';
import { Registration } from './registration.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RegistrationService {

	private resourceUrl = 'api/registrations';

	constructor(private http: Http) {}

	create(registration: Registration): Observable < Registration > {
		const copy = this.convert(registration);

		let formData = new FormData();

		formData.append("resume_file", document.forms['editForm'].resume_file.files[0]);

		formData.append("registration", new Blob([JSON.stringify(copy)], {
			type: "application/json"
		}));

		let headers = new Headers();

		let options = new RequestOptions({
			headers: headers
		});

		return this.http.post(this.resourceUrl, formData, options).map((res: Response) => {
			return res.json();
		});
	}
    enrol(registration: Registration): Observable < Registration > {
    const copy = this.convert(registration);

    let formData = new FormData();

    formData.append("resume_file", document.forms['regForm'].resume_file.files[0]);

    formData.append("registration", new Blob([JSON.stringify(copy)], {
        type: "application/json"
    }));

    let headers = new Headers();

    let options = new RequestOptions({
        headers: headers
    });

    return this.http.post(this.resourceUrl, formData, options).map((res: Response) => {
        return res.json();
    });
}

	update(registration: Registration): Observable < Registration > {
		const copy = this.convert(registration);
		return this.http.put(this.resourceUrl, copy).map((res: Response) => {
			return res.json();
		});
	}

	find(id: number): Observable < Registration > {
		return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
			return res.json();
		});
	}

	query(req ? : any): Observable < ResponseWrapper > {
		const options = createRequestOption(req);
		return this.http.get(this.resourceUrl, options)
			.map((res: Response) => this.convertResponse(res));
	}

	delete(id: number): Observable < Response > {
		return this.http.delete(`${this.resourceUrl}/${id}`);
	}

	private convertResponse(res: Response): ResponseWrapper {
		const jsonResponse = res.json();
		return new ResponseWrapper(res.headers, jsonResponse, res.status);
	}

	private convert(registration: Registration): Registration {
		const copy: Registration = Object.assign({}, registration);
		return copy;
	}
}
