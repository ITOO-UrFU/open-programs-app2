export class Trajectory {
    public id: string;
    public program: Program;
    public target: Target;
    public groups: Group[];
    public modules: Module[];

    constructor ( id: string,
                  program: any ) {
      this.id = id;
      this.program = new Program( program );
    }

    getModules ( modules: any ) {
      this.modules = modules.map (
        (module: any) => {
          return new Module( module.id,
                             module.title );
        }
      );
    }
    getGroups ( groups: any ) {
      this.groups = groups.map (
        (group: any) => {
          return new Group( group.id,
                            group.title,
                            group.get_program_modules );
        }
      );
    }
    getTarget ( target: string ) {
        this.target = new Target( target );
    }
}

export class Program {
    id: string;
    constructor( id: string ) {
        this.id = id;
    }
}
export class Group {
    id: string;
    title: string;
    modules_id: string[];
    constructor( id: string,
                 title: string, modules_id: string[] ){
        this.id = id;
        this.title = title;
        this.modules_id = modules_id;
    }
}

export class Module {
    id: string;
    title: string;
    constructor( id: string, title: string ) {
        this.id = id;
        this.title = title;
    }
}

export class Target {
    id: string;

    constructor( id: string ) {
        this.id = id;
    }
}