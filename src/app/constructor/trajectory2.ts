export class Trajectory {
    public id: string;
    public program_id: string;
    public target_id: string;
    public choice_groups: string[];
    public choice_groups_editeble: string[];
    public modules_selected: any;
    public variants: any = {};

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
    setVariants(discipline_id, variant_id){
        this.variants[discipline_id] = variant_id;
    }

    getVariants(discipline_id){
        return this.variants[discipline_id];
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

