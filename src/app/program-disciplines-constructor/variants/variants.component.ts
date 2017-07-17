import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: '[app-variants]',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {
 public variants: any;

 @Input()  courses: any = [];
 @Input()  diagrams: any;
 @Input()  technologies: any;

 @Input() program_id: any;
 @Input() discipline: any;

  constructor(
    private globalService: GlobalService,
  ) { }

  public getDisciplinesVariants(slug: string) {
    console.log("test");
    this.globalService.getElementsBySlug('get_variants/' + this.program_id, slug)
                    .subscribe(
                      variants => {
                        this.variants = variants;
                        console.log('Список вариантов реализации дисциплин конкретной', variants);
                      },
                      error => console.log(error)
                    );
  }
  public addVariant(value) {
    console.log('addVariant', value);
       this.globalService.postResponseAdmin('create_variant', JSON.stringify(value))
                      .subscribe(
                      status => {
                        console.log("test");
                         this.getDisciplinesVariants(this.discipline.id);
                       console.log(status);
                      },
                      error => console.log(error)
                      );
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
                      )
  }

  ngOnInit() {
    this.getDisciplinesVariants(this.discipline.id);
  }

}
