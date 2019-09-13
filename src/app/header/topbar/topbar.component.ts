import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  searchform: FormGroup;

  constructor() { }

  ngOnInit() {
    this.searchform = new FormGroup ({
      editor: new FormControl(null)
    });
  }

}
