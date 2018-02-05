import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService} from '../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  results: object[];

  constructor(private http: HttpClient,
              private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.inventoryService.getInventory().subscribe(data => {
      this.results = data['results'];
      console.log(this.results);
    });
  }

}
