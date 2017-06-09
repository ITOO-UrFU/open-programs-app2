import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ConstructorService } from '../constructor.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  private program;
  private targets;
  private modules;

  constructor( private router: Router,
               private activateRoute: ActivatedRoute,
               private titleService: Title,
               private service: ConstructorService ) { }

  ngOnInit() {
  this.activateRoute.params
    .switchMap((params: Params) => this.service.getElementsBySlug('programs', params['id']))
    .subscribe((program) => {
      this.program = program;
      this.titleService.setTitle(this.program.title);
      this.service.getElementsBySlug('get_program_targets', this.program.id)
                  .subscribe(
                    targets => {
                      this.targets = targets;
                    }
                  )
      this.service.getElementsBySlug('get_program_modules', this.program.id)
                  .subscribe(
                    modules => {
                      this.modules = modules;console.log(this.program, this.targets, this.modules)
                    }
                  )
      
    });
}

}
