import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Category } from '../models/category';
import { CategoryService} from '../services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css',
              '../../assets/css/ecommerce/style.css']
})
export class AppNavbarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  results: object[];

  ngOnInit() {
    this.categoryService.getCategory().subscribe(data => {
      this.results = data['results'];
      console.log('Categories-------', this.results);
    });
  }

}
