import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css'
})
export class BidComponent implements OnInit {

  id = ''
  imageUrl = ''
  email = ''
  offer = 0
  tou: boolean | null = null
  showSuccess = false
  errMsg = ''
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (value: any) => {
        this.id = value.id;
        this.imageUrl = value.imageUrl
      },
      error: (err: any) => {
        console.log(err.message)
      }
    })
  }

  send() {
    this.errMsg = ''
    if (this.tou == null || this.tou == false) {
      this.tou = false
      return
    }
this.http.post('https://art-of-ai-auction.jedlik.cloud/api/bid', {
  paintingId: this.id,
  email: this.email,
  price: this.offer
}).subscribe({
  next: (res: any) => {
this.showSuccess = true
  },
  error: (err: any) => {
this.errMsg = err.message
  }
})
  }
}
