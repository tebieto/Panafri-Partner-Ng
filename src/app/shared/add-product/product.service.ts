import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";


import { Product } from "./product.model";
import { Config } from "../config";

@Injectable()
export class ProductService {
    constructor(private http: Http) { }
    token= ""
    product(product: Product) {
        
         this.token = "Bearer" + product.token
         console.log(this.token)

        let headers = new Headers({ "Authorization": this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            Config.apiUrl + "product",
            JSON.stringify({

                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
                location: product.location,
                quantity:product.quantity,
                category: product.category,
                store: product.store
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

    image(image, product: Product) {
        
        this.token = "Bearer" + product.token
        console.log(image) 
        console.log("image")

       let headers = new Headers({ "Authorization": this.token });
       let options = new RequestOptions({ headers: headers });
       return this.http.post(
           Config.apiUrl + "save/image",
           JSON.stringify({
               img: image,
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

    edit(product: Product) {
        
        this.token = "Bearer" + product.token
        console.log(this.token)

       let headers = new Headers({ "Authorization": this.token });
       let options = new RequestOptions({ headers: headers });
       return this.http.post(
           Config.apiUrl + "edit/product",
           JSON.stringify({
               id: product.id,
               name: product.name,
               image: product.image,
               description: product.description,
               price: product.price,
               location: product.location,
               quantity:product.quantity,
               category: product.category,
               store: product.store
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

   delete(product: Product) {
        
    this.token = "Bearer" + product.token
    console.log(this.token)

   let headers = new Headers({ "Authorization": this.token });
   let options = new RequestOptions({ headers: headers });
   return this.http.post(
       Config.apiUrl + "delete/product",
       JSON.stringify({
           id: product.id, 
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