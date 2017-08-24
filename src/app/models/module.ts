export class Module {
    public id: string;
    public title: string;
    public choice_group: string;
    public competence: string;
    public disciplines: any[];
    public labor: number;
    public priority: number;
    public semester: number;
    public targets_positions: number[];
    public targets_positions_indexed: any;

    constructor ( id: string,
                  title: string,
                  choice_group: string,
                  competence: string,
                  disciplines: any[],
                  get_labor: number,
                  priority: number,
                  semester: number,
                  targets_positions: number[],
                  targets_positions_indexed: any ) {

      this.id = id;
      this.title = title;
      this.choice_group = choice_group;
      this.competence = competence;
      this.disciplines = disciplines;
      this.labor = get_labor;
      this.priority = priority;
      this.semester = semester;
      this.targets_positions = targets_positions;
      this.targets_positions_indexed = targets_positions_indexed;
    };
}