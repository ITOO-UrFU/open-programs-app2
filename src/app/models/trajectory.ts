import { Target } from './target';
import { Module } from './module';

export class Trajectory {
    public id: string;
    public program_id: string;
    public target: Target;

    public module_ids: String[] = [];
    public modules: Module[] = [];
    public modules_by_id: Object = {};


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
    }
    addModule( module: Module ): boolean {
        if ( this.module_ids.indexOf(module.id) === -1 ) {
            this.modules.push(module);
            this.module_ids.push(module.id);
            this.modules_by_id[module.id] = module;
            return true;
        }
        return false;
    }
    removeModule( module: Module ): boolean {
        if ( this.module_ids.indexOf(module.id) !== -1 ) {
            this.modules.splice(this.modules.indexOf(module), 1);
            this.module_ids.splice(this.module_ids.indexOf(module.id), 1);
            delete this.modules_by_id[module.id];
            return true;
        }
        return false;
    }
    toggleModule(module: Module ) {
        if ( this.module_ids.indexOf(module.id) === -1 ) {
            console.log('add:', this.addModule( module ) );
        } else {
            console.log('remove:', this.removeModule( module ) );
        }
    }

    getModule( module_id: string ){
        if ( this.module_ids.indexOf(module_id) !== -1 ) {
            return this.modules_by_id[module_id];
        } else {
            return false;
        }
    }


    setModulesDefault(modules: any){
        this.modules_selected = this.choice_groups.map(
            (choice_group) => {
               return modules.filter(
                   module => module.choice_group === choice_group && module.targets_positions_indexed[this.target.id] === 1
                ).map(module => module.id)
            }
        )
        this.choice_groups_editeble = this.choice_groups.filter(
            (choice_group) => {
               return modules.filter(
                   module => module.choice_group === choice_group && module.targets_positions_indexed[this.target.id] !== 1
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
}

