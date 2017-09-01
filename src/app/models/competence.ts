export class Competence {
    public id: string;
    public title: string;
    public number: number;
    public color: string;

    constructor( id: string,
                 title: string,
                 number: number,
                 color: string ) {
      this.id = id;
      this.title = title;
      this.number = number;
      this.color = color;
    };
}

