export class Module {
    id: string;
    title: string;
    choice_group: string;
    competence: string;
    disciplines: any[];
    get_labor: number;
    priority: number;
    semester: number;
    targets_positions: number[];
    targets_positions_indexed: any;

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
      this.get_labor = get_labor;
      this.priority = priority;
      this.semester = semester;
      this.targets_positions = targets_positions;
      this.targets_positions_indexed = targets_positions_indexed;
    };
}