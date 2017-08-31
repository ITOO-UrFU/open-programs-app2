export class Target {
    id: string;
    title: string;
    program: string;
    choice_groups: string[];
    number: number;

    constructor( id: string,
                 title: string,
                 program: string,
                 choice_groups: string[],
                 number: number ) {
        this.id = id;
        this.title = title;
        this.program = program;
        this.choice_groups = choice_groups;
        this.number = number;
    };

    getChoiceGroups() {
        return this.choice_groups;
    }
}