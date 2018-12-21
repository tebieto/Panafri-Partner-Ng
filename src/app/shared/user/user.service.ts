import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Config } from "../config";
import { User } from "./user.model";

@Injectable()
export class UserService {
    baseUrl = Config.apiUrl + "user";

    constructor(private http: Http) { }

    load(params) {
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
        
        let headers = new Headers({ "Authorization": "Bearer" + params });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl,options).pipe(
            map(res => res.json()),
            map(data => {
                
                let userList = [];
                userList.push(data)
                return userList;
            }),
            catchError(this.handleErrors)
        );
    }

    onApp(params) {
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
       
        let headers = new Headers({ "Authorization": "Bearer" + params });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + "/on/app",options).pipe(
            map(res => res.json()),
            map(data => {
                return data;
            }),
            catchError(this.handleErrors)
        );
    }

    offApp(params) {
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
       
        let headers = new Headers({ "Authorization": "Bearer" + params });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + "/off/app",options).pipe(
            map(res => res.json()),
            map(data => {
                return data;
            }),
            catchError(this.handleErrors)
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