export class Trajectory{
  	public id: string;
  	public program: Program;
	public _target: Target;
	public _groups: Group[];
  	private _modules: Module[];
	


	constructor(id: string, program: any) {
		this.id = id;
		this.program = new Program( program );
	}
	modules( modules: any ) {
		this._modules = modules.map( module => new Module( module.id, module.title ) );
	}
	groups( groups: any ) {
		this._groups = groups.map( group => new Group( group.id, group.title, group.get_program_modules ) );
	}
	target( target: string, groups_id: string[] ) {
		this._target = new Target( target, groups_id);
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
	constructor( id: string, title: string, modules_id: string[] ){
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
	groups_id: string[];

	constructor( id: string, groups_id: string[] ) {
		this.id = id;
		this.groups_id = groups_id;
	}
}