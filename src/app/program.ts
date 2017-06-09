export class Program {
    id: string;                         // "295fff4f-8805-47c8-9ef1-0beb491700ac"
    title: string;                      // "Управление персоналом"
    training_direction: string;         // "38.03.03 Управление персоналом"
    get_level_display: string;          // "бакалавриат"
    get_competences_diagram: any;       // {Тест 1: [], Тест 2: [], Тест 3: [], Тест 4: [], Тест 5: []}
    get_choice_groups: string[];        // []
    chief: any;                         // class User or Preson {user: {id: 1, username: "root", email: "mastergowen@gmail.com"}, first_name: "", last_name: "", second_name: "", sex: "U", …}
    competences: any[];
    jopa:string = 'жопа';

    constructor(
                id: string,   
                title: string,          
                training_direction: string,
                get_level_display: string,     
                get_competences_diagram: any,      
                get_choice_groups: string[],        
                chief: any,                        
                competences: any[],
                jopa: string,
                ){
    this.id = id;   
    this.title = title;           
    this.training_direction = training_direction;   
    this.get_level_display = get_level_display;     
    this.get_competences_diagram = get_competences_diagram;      
    this.get_choice_groups = get_choice_groups;        
    this.chief = chief;                         
    this.competences = competences;
    this.jopa = jopa;
    }
}









