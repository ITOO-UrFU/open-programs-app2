export class Trajectory {
    public id: string;
    public program_id: string;
    public target_id: string;
    public choice_groups: string[];
    public modules_default: any;

    constructor ( id: string, program_id: string  ) {
      this.id = id;
      this.program_id = program_id;
    }
    getTargetId(){
        return this.target_id;
    }
    setTarget ( target: any ) {
        this.target_id = target.id;
        this.choice_groups = target.choice_groups;
    }
    setModulesDefault(modules: any){
        this.modules_default = this.choice_groups.map(
            (choice_group) => {
               return modules.filter(
                   module => module.choice_group === choice_group && module.targets_positions_indexed[this.target_id] === 1
                ).map(module=>module.id)
            }
        )
    }
    getModulesDefault( choice_group_id: string ){
        return this.modules_default[this.choice_groups.indexOf(choice_group_id)];
    }
}

