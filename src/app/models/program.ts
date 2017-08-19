import { Module } from './module';
import { Target } from './target';
import { ChoiceGroup } from './choice-group';
import { Competence } from './competence';

export class Program {
    debug: boolean;
    id: string;                         // Id программы
    title: string;                      // Название программы
    training_direction: string;
    get_level_display: string;
    get_competences_diagram: any;
    get_choice_groups: string[];
    chief: any;
    competences: any[];
    competences_by_id = {};
    modules: Module[];
    modules_by_id = {};
    choice_groups: ChoiceGroup[];
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
                competences: any[],
                debug: boolean ) {
      this.id = id;
      this.title = title;
      this.training_direction = training_direction;
      this.get_level_display = get_level_display;
      this.get_competences_diagram = get_competences_diagram;
      this.get_choice_groups = get_choice_groups;
      this.chief = chief;
      this.competences = competences;
      this.debug = debug;
    }
    getModule(module_id) {
      if ( this.debug ) { console.log('Program: getModule id' + module_id, 'result:', this.modules_by_id[module_id]); };
      return this.modules_by_id[module_id];
    }
    setModules(modules) {
      if ( this.debug ) { console.log('Program: setModule id', modules); };
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
    getChoiceGroup(choice_group_id) {
      if ( this.debug ) { console.log('Program: getModule id' + choice_group_id, 'result:', this.choice_groups_by_id[choice_group_id]); };
      return this.choice_groups_by_id[choice_group_id];
    };
    setChoiceGroup(choice_groups){
      if ( this.debug ) { console.log('Program: setChoiceGroup ', choice_groups); };
      this.choice_groups = choice_groups.map(
        (choice_group: any) => {
          const _choice_group = new ChoiceGroup( choice_group.id,
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
    getTarget(target_id) {
      if ( this.debug ) { console.log('Program: getTarget id' + target_id, 'result:', this.targets_by_id[target_id]); };
      return this.targets_by_id[target_id];
    }
    setTargets(targets) {
      if ( this.debug ) { console.log('Program: setTargets ', targets); };
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
      if ( this.debug ) { console.log('Program: setCompetences ', competences); };
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
      if ( this.debug ) { console.log('Program: setVariants ', variants); };
      const _variants = variants;
      this.variants = _variants;
    }
}