import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../global.service';

@Component({
  selector: '[footer]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer: any[] = [];

  constructor(private globalService: GlobalService){}

  ngOnInit(){
    this.globalService.getFooter()
                      .subscribe(
                        footer => {this.footer = footer; console.debug(this.footer)},
                        error => console.log(error));

  }

}
