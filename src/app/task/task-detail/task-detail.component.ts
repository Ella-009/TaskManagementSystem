import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  quoteId: string | null = null; 
  quote: any; 

  constructor(private dataService: DataService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { } 

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.quoteId = value.get('id'); 
      this.dataService.getQuoteDetail(this.quoteId)
      .subscribe({
        next: (response) => {
          console.log("Successfully get quote detail!"); 
          this.quote = response; 
        },
        error: (error) => {
          console.log("error: " + error); 
          this.router.navigate(['/notfound']); 
        }
      }); 
    }); 
  }
}
