export class Program {
    id: string;
    title: string;
    training_direction: string;
    get_level_display: string;
    get_competences_diagram: any;
    get_choice_groups: string[];
    chief: any;
    competences: any[];

    constructor(
                id: string,
                title: string,
                training_direction: string,
                get_level_display: string,
                get_competences_diagram: any,
                get_choice_groups: string[],
                chief: any,
                competences: any[],
                ){
    this.id = id;
    this.title = title;
    this.training_direction = training_direction;
    this.get_level_display = get_level_display;
    this.get_competences_diagram = get_competences_diagram;
    this.get_choice_groups = get_choice_groups;
    this.chief = chief;
    this.competences = competences;
    }
}









