import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Config } from "../config";
import { Services } from "./services.model";

@Injectable()
export class ServicesService {
    baseUrl = Config.apiUrl + "services";

    constructor(private http: Http) { }

    load(param) {
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.

        let headers = new Headers({ "Authorization": "Bearer " + param });
        let options = new RequestOptions({ headers: headers });

        let params = new URLSearchParams();
        params.append("sort", "{\"_kmd.lmt\": 1}");

        return this.http.get(this.baseUrl, options).pipe(
            map(res => res.json()),
            map(data => {
                let serviceList = [];
                data.forEach((service) => {
                    serviceList.push(new Services(
                        service.id, 
                        service.name, 
                        service.price, 
                        service.owner,
                        service.store,
                        service.type, 
                        service.description, 
                        service.category, 
                        service.location,
                        service.status,
                        service.image, 
                        service.created_at,
                        service.updated_at, 
                        ));
                });
                return serviceList;
            }),
        );
    }

    
    getCommonHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Kinvey " + Config.token);
        return headers;
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}