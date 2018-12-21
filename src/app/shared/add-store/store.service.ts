import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Store } from "./store.model";
import { Config } from "../config";

@Injectable()
export class StoreService {
    constructor(private http: Http) { }
    token= ""
    store(store: Store) {
        console.log(store)
         this.token = "Bearer" + store.token

        let headers = new Headers({ "Authorization": this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            Config.apiUrl + "store",
            JSON.stringify({

                name: store.name,
                image: store.image,
                description: store.description,
                email: store.email,
                phone:store.phone,
                address: store.address,
                state:store.state,
                landmark:store.landmark,
                identity:store.identity
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

    edit(store: Store) {
        console.log(store)
         this.token = "Bearer" + store.token

        let headers = new Headers({ "Authorization": this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            Config.apiUrl + "edit/store",
            JSON.stringify({
                id: store.id,
                name: store.name,
                image: store.image,
                description: store.description,
                email: store.email,
                phone:store.phone,
                address: store.address,
                state:store.state,
                landmark:store.landmark,
                identity:store.identity
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

    delete(store: Store) {
        console.log(store)
         this.token = "Bearer" + store.token

        let headers = new Headers({ "Authorization": this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            Config.apiUrl + "delete/store",
            JSON.stringify({
                id: store.id,
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