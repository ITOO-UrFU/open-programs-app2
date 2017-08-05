export class Trajectory {
    public id: string;
    public program_id: string;
    public target_id: string;
    public choice_groups: string[];
    public modulesList: any[];
    public modules_by_id_group = {};


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
    setChoiceGroups ( choice_groups: string[] ) {
        this.choice_groups = choice_groups ;
    }
    getModules(modulesList) {
        this.modulesList = modulesList.map(
            (modules, index) => {
                const _modules = modules;
                this.modules_by_id_group[this.choice_groups[index]] = _modules;
                return _modules;
            }
        )
    }
}

