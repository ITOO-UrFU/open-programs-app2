export class ChoiceGroup {
    public id: string;
    public title: string;
    public program: string;
    public labor: number;
    public type: string; // Майнор, Модуль по выбору и др.
    public modules: string[]; // ID модулей
    public number: number;

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
}
