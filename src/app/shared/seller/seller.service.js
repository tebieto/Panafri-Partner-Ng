"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var config_1 = require("../config");
var SellerService = /** @class */ (function () {
    function SellerService(http) {
        this.http = http;
        this.baseUrl = config_1.Config.apiUrl + "seller/";
    }
    SellerService.prototype.load = function (params) {
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
        console.log("params");
        console.log(params);
        var headers = new http_1.Headers({ "Authorization": "Bearer " + params["token"] });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + params["owner"], options).pipe(operators_1.map(function (res) { return res.json(); }), operators_1.map(function (data) {
            var sellerList = [];
            sellerList.push(data);
            return sellerList;
        }), operators_1.catchError(this.handleErrors));
    };
    SellerService.prototype.getCommonHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Kinvey " + config_1.Config.token);
        return headers;
    };
    SellerService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return rxjs_1.Observable.throw(error);
    };
    SellerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SellerService);
    return SellerService;
}());
exports.SellerService = SellerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWxsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUY7QUFDekYsNkJBQWtDO0FBQ2xDLDRDQUFzRDtBQUV0RCxvQ0FBbUM7QUFJbkM7SUFHSSx1QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGOUIsWUFBTyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBRUYsQ0FBQztJQUVuQyw0QkFBSSxHQUFKLFVBQUssTUFBTTtRQUNQLDBHQUEwRztRQUMxRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFbkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDOUQsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxFQUN0QixlQUFHLENBQUMsVUFBQSxJQUFJO1lBRUosSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUMsRUFDRixzQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFHRCx3Q0FBZ0IsR0FBaEI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsS0FBZTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsaUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXBDUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBSWlCLFdBQUk7T0FIckIsYUFBYSxDQXFDekI7SUFBRCxvQkFBQztDQUFBLEFBckNELElBcUNDO0FBckNZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucywgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IFNlbGxlciB9IGZyb20gXCIuL3NlbGxlci5tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2VsbGVyU2VydmljZSB7XHJcbiAgICBiYXNlVXJsID0gQ29uZmlnLmFwaVVybCArIFwic2VsbGVyL1wiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XHJcblxyXG4gICAgbG9hZChwYXJhbXMpIHtcclxuICAgICAgICAvLyBLaW52ZXktc3BlY2lmaWMgc3ludGF4IHRvIHNvcnQgdGhlIGdyb2NlcmllcyBieSBsYXN0IG1vZGlmaWVkIHRpbWUuIERvbuKAmXQgd29ycnkgYWJvdXQgdGhlIGRldGFpbHMgaGVyZS5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtc1wiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcylcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgcGFyYW1zW1widG9rZW5cIl0gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VVcmwgICsgcGFyYW1zW1wib3duZXJcIl0sb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgbWFwKHJlcyA9PiByZXMuanNvbigpKSxcclxuICAgICAgICAgICAgbWFwKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsbGVyTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VsbGVyTGlzdC5wdXNoKGRhdGEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsbGVyTGlzdDtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcnMpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGdldENvbW1vbkhlYWRlcnMoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJLaW52ZXkgXCIgKyBDb25maWcudG9rZW4pO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XHJcbiAgICB9XHJcbn0iXX0=