import { Target } from './target';
import { Module } from './module';

export class Trajectory {
    public id: string;
    public program_id: string;
    public target: Target;

    public module_ids: String[];
    public modules: Module[];
    public modules_by_id: Object = {};



    public target_id: string;
    public choice_groups: string[];
    public choice_groups_editeble: string[];
    public modules_selected: any;
    public variants_selected: any = {};

    private data: any = {};

    constructor ( id: string, program_id: string  ) {
      this.id = id;
      this.program_id = program_id;
    }

    getTargetId() {
        return this.target.id;
    }
    setTarget ( target: Target ) {
        this.target = target;

        // old
        this.target_id = target.id;
        this.choice_groups = target.choice_groups;
        // old
    }
    addModule( module: Module ) {
        if ( this.module_ids.indexOf(module.id) === -1 ) {
            this.modules.push(module);
            this.module_ids.push(module.id);
            this.modules_by_id[module.id] = module;
        }
    }
    removeModule( module: Module ) {
        if ( this.module_ids.indexOf(module.id) !== -1 ) {
            this.modules.slice(this.modules.indexOf(module), 1);
            this.module_ids.slice(this.module_ids.indexOf(module.id), 1);
            delete this.modules_by_id[module.id];
        }
    }




    setModulesDefault(modules: any){
        this.modules_selected = this.choice_groups.map(
            (choice_group) => {
               return modules.filter(
                   module => module.choice_group === choice_group && module.targets_positions_indexed[this.target_id] === 1
                ).map(module => module.id)
            }
        )
        this.choice_groups_editeble = this.choice_groups.filter(
            (choice_group) => {
               return modules.filter(
                   module => module.choice_group === choice_group && module.targets_positions_indexed[this.target_id] !== 1
                ).length > 0;
            }
        )
    }
    getModulesDefault( choice_group_id: string ){
        return this.modules_selected[this.choice_groups.indexOf(choice_group_id)];
    }

    getChoiceGroupEditable(choice_group){
        return this.choice_groups_editeble.indexOf(choice_group) !== -1;
    }

    setVariantSelected(discipline_id, variant_id){
        this.variants_selected[discipline_id] = variant_id;
    }
    getVariantSelected(discipline_id){
        return this.variants_selected[discipline_id];
    }

    toggleModule(module){
        let currentModules = this.modules_selected[this.choice_groups.indexOf(module.choice_group)]
        if (currentModules.indexOf(module.id) === -1) {
            currentModules.push(module.id);
        } else {
            currentModules.splice(currentModules.indexOf(module.id),1);
        }
    }
}

