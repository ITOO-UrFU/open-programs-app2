export class Program {
    id: string;
    title: string;
    training_direction: string;
    get_level_display: string;
    get_competences_diagram: any;
    get_choice_groups: string[];
    chief: any;
    competences: any[];
    modules: Module[];
    moduleById = {};

    constructor( id: string,
                title: string,
                training_direction: string,
                get_level_display: string,
                get_competences_diagram: any,
                get_choice_groups: string[],
                chief: any,
                competences: any[] ) {
        this.id = id;
        this.title = title;
        this.training_direction = training_direction;
        this.get_level_display = get_level_display;
        this.get_competences_diagram = get_competences_diagram;
        this.get_choice_groups = get_choice_groups;
        this.chief = chief;
        this.competences = competences;
    }
    getModules(modules) {
      this.modules = modules.map(
        (module: any) => {
          const _module = new Module ( module.id,
                              module.title,
                              module.choice_group,
                              module.competence,
                              module.disciplines,
                              module.get_labor,
                              module.priority,
                              module.semester,
                              module.targets_positions,
                              module.targets_positions_indexed );
          this.moduleById[module.id] = _module;
          return _module;
        }
      );
    };
}

class Module {
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






