"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var config_1 = require("../config");
var NotificationService = /** @class */ (function () {
    function NotificationService(http) {
        this.http = http;
        this.data = {};
    }
    NotificationService.prototype.notification = function (notification) {
        this.data = { "data": {
                "title": notification.title,
                "body": notification.body,
                "app": "user",
                "image": notification.image,
            },
            "to": notification.deviceToken
        };
        return this.http.post(config_1.Config.fcmUrl, this.data, { headers: this.getCommonHeaders() }).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.map(function (data) { return data; }), operators_1.catchError(this.handleErrors));
    };
    NotificationService.prototype.getCommonHeaders = function () {
        console.log(config_1.Config.fcmAuth);
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", config_1.Config.fcmAuth);
        return headers;
    };
    NotificationService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return rxjs_1.Observable.throw(error);
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFDeEQsNkJBQWtDO0FBQ2xDLDRDQUFzRDtBQUd0RCxvQ0FBbUM7QUFHbkM7SUFDSSw2QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFDOUIsU0FBSSxHQUFDLEVBQUUsQ0FBQTtJQUQyQixDQUFDO0lBRW5DLDBDQUFZLEdBQVosVUFBYSxZQUEwQjtRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFO2dCQUNsQixPQUFPLEVBQUcsWUFBWSxDQUFDLEtBQUs7Z0JBQzVCLE1BQU0sRUFBSSxZQUFZLENBQUMsSUFBSTtnQkFDM0IsS0FBSyxFQUFJLE1BQU07Z0JBQ2YsT0FBTyxFQUFJLFlBQVksQ0FBQyxLQUFLO2FBQ2hDO1lBQ0QsSUFBSSxFQUFHLFlBQVksQ0FBQyxXQUFXO1NBQ2xDLENBQUE7UUFFRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2pCLGVBQU0sQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFDdkIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkMsQ0FBQyxJQUFJLENBQ0YsZUFBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxFQUNoQyxlQUFHLENBQUMsVUFBQSxJQUFJLElBQUssTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFBLENBQUMsQ0FBQyxFQUMxQixzQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRCw4Q0FBZ0IsR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBYSxLQUFlO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxpQkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBbENRLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQUVpQixXQUFJO09BRHJCLG1CQUFtQixDQW1DL0I7SUFBRCwwQkFBQztDQUFBLEFBbkNELElBbUNDO0FBbkNZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4vbm90aWZpY2F0aW9uLm1vZGVsXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuICAgIGRhdGE9e31cclxuICAgIG5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHsgXCJkYXRhXCI6IHtcclxuICAgICAgICAgICAgXCJ0aXRsZVwiIDogbm90aWZpY2F0aW9uLnRpdGxlLFxyXG4gICAgICAgICAgICBcImJvZHlcIiAgOiBub3RpZmljYXRpb24uYm9keSxcclxuICAgICAgICAgICAgXCJhcHBcIiAgOiBcInVzZXJcIixcclxuICAgICAgICAgICAgXCJpbWFnZVwiICA6IG5vdGlmaWNhdGlvbi5pbWFnZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidG9cIiA6IG5vdGlmaWNhdGlvbi5kZXZpY2VUb2tlblxyXG4gICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgICAgICAgIENvbmZpZy5mY21VcmwsdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH1cclxuICAgICAgICApLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpLFxyXG4gICAgICAgICAgICBtYXAoZGF0YSA9PiB7cmV0dXJuIGRhdGF9KSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9ycylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbW1vbkhlYWRlcnMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coQ29uZmlnLmZjbUF1dGgpXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgQ29uZmlnLmZjbUF1dGgpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XHJcbiAgICB9XHJcbn0iXX0=