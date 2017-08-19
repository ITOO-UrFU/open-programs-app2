export class Variant {
    id: string;
    course: string;
    diagram: any;
    link: string;
    parity: number;
    semester: any;
    campus: number;
    mobility: number;
    sync: number;

    constructor(    id: string,
                    course: string,
                    diagram: any,
                    link: string,
                    parity: number,
                    semester: any,
                    campus: number,
                    mobility: number,
                    sync: number ) {
    this.id = id;
    this.course = course;
    this.diagram = diagram;
    this.link = link;
    this.parity = parity;
    this.semester = semester;
    this.campus = campus;
    this.mobility = mobility;
    this.sync = sync;
    };
}