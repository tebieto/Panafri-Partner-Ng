import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Service } from "./service.model";
import { Config } from "../config";

@Injectable()
export class ServiceService {
    constructor(private http: Http) { }
    token= ""
    service(service: Service) {
        console.log(service)
         this.token = "Bearer" + service.token

        let headers = new Headers({ "Authorization": this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            Config.apiUrl + "service",
            JSON.stringify({
                name: service.name,
                image: service.image,
                description: service.description,
                price: service.price,
                location: service.location,
                quantity:service.quantity,
                category: service.category,
                store: service.store
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            map(response => response.json()),
            map(data => {
                return data
            }),
            catchError(this.handleErrors)
        );
    }

    edit(service: Service) {
        console.log(service)
         this.token = "Bearer" + service.token

        let headers = new Headers({ "Authorization": this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            Config.apiUrl + "edit/service",
            JSON.stringify({
                id: service.id,
                name: service.name,
                image: service.image,
                description: service.description,
                price: service.price,
                location: service.location,
                quantity:service.quantity,
                category: service.category,
                store: service.store
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            map(response => response.json()),
            map(data => {
                return data
            }),
            catchError(this.handleErrors)
        );
    }

    delete(service: Service) {
        console.log(service)
         this.token = "Bearer" + service.token

        let headers = new Headers({ "Authorization": this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            Config.apiUrl + "delete/service",
            JSON.stringify({
                id: service.id,
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            map(response => response.json()),
            map(data => {
                return data
            }),
            catchError(this.handleErrors)
        );
    }

    getCommonHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", this.token);
        return headers;
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}