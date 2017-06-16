export class Trajectory{
	public id: string;
	public program: Program;
	private _modules: Module[];
	


	constructor(id:string, program:any){
		this.id = id;
		this.program = new Program( program.id );
	}
	modules( modules:any ){
		this._modules = modules.map( module => new Module(module.id, module.title))
	}
}

export class Program{
	id:string;
	constructor( id:string ){
		this.id = id;
	}
}
export class Module{
	id: string;
	title: string;
	constructor( id: string, title: string ) {
		this.id = id;
		this.title = title
	}
}