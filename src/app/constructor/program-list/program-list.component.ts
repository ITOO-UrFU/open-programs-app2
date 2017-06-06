import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { ConstructorService } from '../constructor.service';


@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  public programList: Array<any>;

  constructor(private router: Router, private service: ConstructorService) { }

  onSelect(id: string ) {
    this.router.navigate(['/constructor', 'program', id]);
  }

  ngOnInit() {
    this.service.getElements('programs')
                .subscribe(
                  data => {
                    this.programList = data;
                  },
                  error => {
                    console.log(error)
                  }
                );
  }
}







