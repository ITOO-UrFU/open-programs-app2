import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../global.service';
import {forEach} from "@angular/router/src/utils/collection";
import {isNullOrUndefined} from "util";

@Component({
  selector: '[app-variants]',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {

 @Input()  courses: any = [];
 @Input()  diagrams: any;
 @Input()  technologies: any;
 @Input() program_id: any;
 @Input() discipline: any;
 @Input() variants: any;

  constructor(
    private globalService: GlobalService,
  ) { }

  public getDisciplinesVariants(slug: string) {
    this.globalService.getElementsBySlug('get_variants/' + this.program_id, slug)
                    .subscribe(
                      variants => {
                        this.variants = variants;
                      },
                      error => console.log(error)
                    );
  }
addDefaultVariants() {
    this.globalService.postResponse('add_default_variants', JSON.stringify(
      {"discipline_id": this.discipline.id,
      "program_id": this.program_id
    }
  ))
                      .subscribe(
                      status => {
                        this.getDisciplinesVariants(this.discipline.id);
                        console.log(status);
                      },
                      error => console.log(error)
                      );
  }

  public addVariant(value) {
    console.log('addVariant', value);
       this.globalService.postResponseAdmin('create_variant', JSON.stringify(value))
                      .subscribe(
                      status => {

                         this.getDisciplinesVariants(this.discipline.id);
                       console.log(status);
                      },
                      error => console.log(error)
                      );
  }

  public disabledButton(): boolean {

    if (this.discipline.terms['3,5 года'] === 0 || this.discipline.terms['4 года'] === 0 || this.discipline.terms['5 лет'] === 0){
      return true;
    } else {
      return false;
    }
  }

  public addVariantSemester() {
    let terms: string;
    if (this.discipline.terms['3,5 года'] > 0) {
      terms = '3,5 года';
    } else  if (this.discipline.terms['4 года'] > 0) {
      terms = '4 года';
    } else  if (this.discipline.terms['5 лет'] > 0) {
      terms = '5 лет';
    }
    console.log(terms)
    if (terms !== undefined) {
      const value = {program_id: this.program_id, discipline_id: this.discipline.id, term_title: terms}
      console.log('addVariant', value);
      this.globalService.postResponseAdmin('create_variant', JSON.stringify(value))
        .subscribe(
          status => {
            this.getDisciplinesVariants(this.discipline.id);
            console.log(status);
          },
          error => console.log(error)
        );
    } else {
      console.log('не указан симестр');
    }
  }

    public removeVariant(value){
    console.log(value);
       this.globalService.postResponseAdmin('delete_variant', JSON.stringify(value))
                      .subscribe(
                      status => {
                         this.getDisciplinesVariants(this.discipline.id);
                       console.log(status);
                      },
                      error => console.log(error)
                      );
  }
  changeVariant(value){
    console.log(value);
    this.globalService.postResponse('change_variant', JSON.stringify(value))
                      .subscribe(
                      status => {
                         console.log(status);
                      },
                      error => console.log(error)
                      );
  }

  ngOnInit() {
    // this.getDisciplinesVariants(this.discipline.id);
  }

}
