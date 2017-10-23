import { Target } from './target';
import { Module } from './module';

export class Trajectory {
    public id: string;
    public program_id: string;
    public target: Target;

    public module_ids: String[] = [];
    public modules: Module[] = [];
    public modules_by_id: Object = {};
    public variants_by_id: Object = {};


    public choice_groups: string[];
    public choice_groups_editeble: string[];
    public modules_selected: any;


    private data = {
        status: false
    };

    constructor ( id: string, program_id: string  ) {
      this.id = id;
      this.program_id = program_id;
    }
    getStatus() {
        return this.data.status;
    }

    getTrajectoryData(){
        this.data.status = true;
        this.data['target'] = this.target;
        this.data['modules'] = this.modules;
        this.data['variants'] = this.variants_by_id;
        return this.data;
    }

    setTrajectoryData(data) {
        this.data.status = data.status;
        const target = data['target'];
        const modules = data['modules'];
        const variants = data['variants'];

        this.setTarget( new Target ( target.id,
                                     target.title,
                                     target.program,
                                     target.choice_groups,
                                     target.number ) );


        modules.forEach(
            module => {
                this.addModule( new Module( module.id,
                                            module.title,
                                            module.choice_group,
                                            module.competence,
                                            module.disciplines,
                                            module.labor,
                                            module.priority,
                                            module.semester,
                                            module.targets_positions,
                                            module.targets_positions_indexed ) );
            }
        );
       this.variants_by_id = variants;
    }

    getTargetId() {
        if (this.target) {
            return this.target.id;
        } else {
            return undefined;
        };
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
    removeAllModule(){
        this.modules = [];
        this.modules_by_id = {};
        this.module_ids = [];
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


    // setModulesDefault(modules: any){
    //     this.modules_selected = this.choice_groups.map(
    //         (choice_group) => {
    //            return modules.filter(
    //                module => module.choice_group === choice_group && module.targets_positions_indexed[this.target.id] === 1
    //             ).map(module => module.id)
    //         }
    //     )
    //     this.choice_groups_editeble = this.choice_groups.filter(
    //         (choice_group) => {
    //            return modules.filter(
    //                module => module.choice_group === choice_group && module.targets_positions_indexed[this.target.id] !== 1
    //             ).length > 0;
    //         }
    //     )
    // }
    // getModulesDefault( choice_group_id: string ){
    //     return this.modules_selected[this.choice_groups.indexOf(choice_group_id)];
    // }

    // getChoiceGroupEditable(choice_group){
    //     return this.choice_groups_editeble.indexOf(choice_group) !== -1;
    // }
    setVariantSelected(discipline_id, disciplines_labor, variant, semester){
        const current_variant = {id: variant.id, semester: semester, diagram: variant.diagram, labor: disciplines_labor};
        this.variants_by_id[discipline_id] = current_variant;
    }
    getVariantSelected(discipline_id) {
        if (this.variants_by_id[discipline_id]) {
            return this.variants_by_id[discipline_id];
        } else {
            return false;
        }
    }
    getLabor(semester){
        if(Object.keys(this.variants_by_id).map(key => this.variants_by_id[key]).length){
            return Object.keys(this.variants_by_id).map(key => this.variants_by_id[key])
            .filter(element => element.semester === semester).reduce((a, b) => a + b.labor, 0);
        }
        else {
            return 0;
         }
    }

    getVariants(){
        return this.variants_by_id;
    }

}

