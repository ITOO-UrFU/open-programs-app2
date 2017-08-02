export class Program {
    id: string;
    title: string;
    training_direction: string;
    get_level_display: string;
    get_competences_diagram: any;
    get_choice_groups: string[];
    chief: any;
    competences: any[];
    competences_by_id = {};
    modules: Module[];
    modules_by_id = {};
    choice_groups: ChoicGroup[];
    choice_groups_by_id = {};
    targets: Target[];
    targets_by_id = {};
    variants = {};

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
    setModules(modules) {
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
          this.modules_by_id[module.id] = _module;
          return _module;
        }
      );
    }
    setChoicGroup(choice_groups){
      this.choice_groups = choice_groups.map(
        (choice_group: any) => {
          const _choice_group = new ChoicGroup( choice_group.id,
                                                choice_group.title,
                                                choice_group.program,
                                                choice_group.labor,
                                                choice_group.get_choice_group_type_display,
                                                choice_group.get_program_modules,
                                                choice_group.number );
          this.choice_groups_by_id[choice_group.id] = _choice_group;
          return _choice_group;
        }
      );
    }
    setTargets(targets) {
      this.targets = targets.map(
        (target) => {
          const _target = new Target( target.id,
                                      target.title,
                                      target.program,
                                      target.choice_groups,
                                      target.number );
          this.targets_by_id[target.id] = _target;
          return _target;
        }
      );
    }
    setCompetences(competences) {
      this.competences = competences.map(
        (competence) => {
          const _competence = new Competence( competence.id,
                                              competence.title,
                                              competence.number );
          this.competences_by_id[competence.id] = _competence;
          return _competence;
        }
      );
    }
    setVariants(variants) {
      console.log('variants', variants);
      const _variants = variants;
      this.variants = _variants;
    }
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

class ChoicGroup {
    id: string;
    title: string;
    program: string;
    labor: number;
    get_choice_group_type_display: string;
    get_program_modules: string[];
    number: number;

    constructor( id: string,
                 title: string,
                 program: string,
                 labor: number,
                 get_choice_group_type_display: string,
                 get_program_modules: string[],
                 number: number ) {
      this.id = id;
      this.title = title;
      this.program = program;
      this.labor = labor;
      this.get_choice_group_type_display = get_choice_group_type_display;
      this.get_program_modules = get_program_modules;
      this.number = number;
    };
}

class Target {
    id: string;
    title: string;
    program: string;
    choice_groups: string[];
    number: number;

    constructor( id: string,
                 title: string,
                 program: string,
                 choice_groups: string[],
                 number: number ) {
      this.id = id;
      this.title = title;
      this.program = program;
      this.choice_groups = choice_groups;
      this.number = number;
    };
}

class Competence {
    id: string;
    title: string;
    number: number;

    constructor( id: string,
                 title: string,
                 number: number ) {
      this.id = id;
      this.title = title;
      this.number = number;
    };
}

