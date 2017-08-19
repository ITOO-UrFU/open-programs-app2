export class ChoiceGroup {
    id: string;
    title: string;
    program: string;
    labor: number;
    get_choice_group_type_display: string;
    get_program_modules: string[]; //ID модулей
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
