export class ChoiceGroup {
    public id: string;
    public title: string;
    public program: string;
    public labor: number;
    public type: string; // Майнор, Модуль по выбору и др.
    public modules: string[]; // ID модулей
    public number: number;

    public modules_default: object = {};

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
      this.type = get_choice_group_type_display;
      this.modules = get_program_modules;
      this.number = number;
    };

    public setModulesDefault(module_default_id, target_id) {
        if (!this.modules_default[target_id]) {
            this.modules_default[target_id] = [];
        }
        this.modules_default[target_id].push(module_default_id);
    }
    public getModulesDefault(target_id) {
        if (this.modules_default[target_id]){
            return this.modules_default[target_id];
        }  else {
            console.warn('Данный target:' + target_id + 'не связан ни с одним модулем из данной Группы выбора:' + this.title)
            return false;
        }

    }
}
