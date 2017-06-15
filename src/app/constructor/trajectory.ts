export class Trajectory{
	id: string;
	program: Program;
	modules: Module[];


	constructor(id:string, program:any, modules:any){
		this.id = id;
		this.program = new Program(program.id);
		this.modules = modules.map(module => new Module(module.id, module.title))
	}
}

export class Program{
	id:string;
	constructor(id:string){
		this.id = id;
	}
}
export class Module{
	id:string;
	title: string;
	constructor(id:string, title:string){
		this.id = id;
		this.title = title
	}
}