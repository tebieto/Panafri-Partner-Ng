import { Component, OnInit } from '@angular/core';
import { ReviewsService } from "../shared/reviews/reviews.service";
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  providers: [ReviewsService]
})
export class ReviewsPage implements OnInit {
  reviewList=[]
  params = {}
  isLoading=false
  listLoaded=true

  constructor(
    private ReviewsService: ReviewsService,
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
  ) { }

  ngOnInit() {

    this.storage.get('token').then((val) => {
        
      this.params = {token:val}
     
      this.ReviewsService.load(this.params)
        .subscribe(loadedReviews => {
          if(loadedReviews.length<1){
            alert("You currently have no review to display")
            return
          }
          loadedReviews.forEach((reviewObject) => {
            this.reviewList.unshift(reviewObject);
            
          });
          this.isLoading = false;
          this.listLoaded = true;
          console.log(this.reviewList);
        });
      });
  }

  
  remark(rt){
    let rating = parseInt(rt)
    if(rating==7) {
      return "Perfect"
    }

    if(rating>3 && rating<7) {
      return "Good"
    }

    if(rating==3) {
      return "Okay"
    }

    if(rating<3) {
      return "Poor"
    }
  }

  arrayGold(n: number): any[] {
    return Array(n);
  }

  arrayLight(n: number): any[] {
    let m= 7-n
    return Array(m);
  }

}
