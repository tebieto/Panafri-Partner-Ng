"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var config_1 = require("../config");
var categories_model_1 = require("./categories.model");
var CategoriesService = /** @class */ (function () {
    function CategoriesService(http) {
        this.http = http;
        this.baseUrl = config_1.Config.apiUrl + "categories";
    }
    CategoriesService.prototype.load = function () {
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
        var params = new http_1.URLSearchParams();
        params.append("sort", "{\"_kmd.lmt\": 1}");
        return this.http.get(this.baseUrl).pipe(operators_1.map(function (res) { return res.json(); }), operators_1.map(function (data) {
            var categoryList = [];
            data.forEach(function (categories) {
                categoryList.push(new categories_model_1.Categories(categories.id, categories.name, categories.type, categories.image, categories.created_at, categories.updated_at));
            });
            return categoryList;
        }), operators_1.catchError(this.handleErrors));
    };
    CategoriesService.prototype.getCommonHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Kinvey " + config_1.Config.token);
        return headers;
    };
    CategoriesService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return rxjs_1.Observable.throw(error);
    };
    CategoriesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CategoriesService);
    return CategoriesService;
}());
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2F0ZWdvcmllcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF5RTtBQUN6RSw2QkFBa0M7QUFDbEMsNENBQXNEO0FBRXRELG9DQUFtQztBQUNuQyx1REFBZ0Q7QUFHaEQ7SUFHSSwyQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGOUIsWUFBTyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0lBRUwsQ0FBQztJQUVuQyxnQ0FBSSxHQUFKO1FBQ0ksMEdBQTBHO1FBQzFHLElBQUksTUFBTSxHQUFHLElBQUksc0JBQWUsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ25DLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsRUFDdEIsZUFBRyxDQUFDLFVBQUEsSUFBSTtZQUNKLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtnQkFDcEIsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFVLENBQzVCLFVBQVUsQ0FBQyxFQUFFLEVBQ2IsVUFBVSxDQUFDLElBQUksRUFDZixVQUFVLENBQUMsSUFBSSxFQUNmLFVBQVUsQ0FBQyxLQUFLLEVBQ2hCLFVBQVUsQ0FBQyxVQUFVLEVBQ3JCLFVBQVUsQ0FBQyxVQUFVLENBQ3BCLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN4QixDQUFDLENBQUMsRUFDRixzQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFHRCw0Q0FBZ0IsR0FBaEI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsS0FBZTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsaUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXpDUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FJaUIsV0FBSTtPQUhyQixpQkFBaUIsQ0EwQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQTFDRCxJQTBDQztBQTFDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBDYXRlZ29yaWVzIH0gZnJvbSBcIi4vY2F0ZWdvcmllcy5tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcmllc1NlcnZpY2Uge1xyXG4gICAgYmFzZVVybCA9IENvbmZpZy5hcGlVcmwgKyBcImNhdGVnb3JpZXNcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG5cclxuICAgIGxvYWQoKSB7XHJcbiAgICAgICAgLy8gS2ludmV5LXNwZWNpZmljIHN5bnRheCB0byBzb3J0IHRoZSBncm9jZXJpZXMgYnkgbGFzdCBtb2RpZmllZCB0aW1lLiBEb27igJl0IHdvcnJ5IGFib3V0IHRoZSBkZXRhaWxzIGhlcmUuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuYXBwZW5kKFwic29ydFwiLCBcIntcXFwiX2ttZC5sbXRcXFwiOiAxfVwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAocmVzID0+IHJlcy5qc29uKCkpLFxyXG4gICAgICAgICAgICBtYXAoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnlMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKGNhdGVnb3JpZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUxpc3QucHVzaChuZXcgQ2F0ZWdvcmllcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllcy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXMudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllcy5pbWFnZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXMuY3JlYXRlZF9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllcy51cGRhdGVkX2F0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYXRlZ29yeUxpc3Q7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3JzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBnZXRDb21tb25IZWFkZXJzKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiS2ludmV5IFwiICsgQ29uZmlnLnRva2VuKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xyXG4gICAgfVxyXG59Il19