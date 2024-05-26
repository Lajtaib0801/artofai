import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  selectedCategoryId = 0;
  paintings: any[] = []
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://art-of-ai-auction.jedlik.cloud/api/categories')
      .subscribe({
        next: (res: any[]) => (this.categories = res),
        error: (err: any) => console.log(err.message),
      });
  }

  changed() {
    this.http.get<any[]>(`https://art-of-ai-auction.jedlik.cloud/api/paintings/${this.selectedCategoryId}`).subscribe({
      next: (res: any[]) => this.paintings = res,
      error: (err: any) => console.log(err.message)
    })
  }

  bid(id: string, imageUrl: string) {
    this.router.navigate(['bidding'], {
      queryParams: {
        id: id,
        imageUrl: imageUrl
      }
    })
  }
}
