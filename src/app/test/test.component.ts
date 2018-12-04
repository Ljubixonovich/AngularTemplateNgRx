import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private toastr: ToastrService) {} 

  ngOnInit() {   
  }

  fireToastr1() {
    this.toastr.success( 'Toastr fun!', '');
  }

  fireToastr2() {
    this.toastr.warning('Hello world!', 'Naslov!');
  }

  fireToastr3() {
    this.toastr.error('Hello world!', 'Naslov!');
  }

  fireToastr4() {
    this.toastr.info('Hello world!', 'Naslov!');
  }
}
