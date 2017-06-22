export class Trajectory {
    public id: string;
    public program_id: string;
    public target_id: string;


    constructor ( id: string,
                  program_id: string  ) {
      this.id = id;
      this.program_id = program_id;
    }
    getTarget ( target_id: string ) {
        this.target_id = target_id;
    }
}

