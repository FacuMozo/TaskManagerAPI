export interface GetTasksResponse{
    status : string;
    data : Task[];
}

export interface TaskResponse {
    name :string;
    _id: string;
    description : string;
    story : string;
    created : Date;
    due : Date;
    done : boolean;
    __v:number;
}

export interface PostTasksResponse{
    status : string;
    data : Task;
}


export class Task{

    constructor(
        public name : string,
        public _id : string,
        public description : string,
        public story : string,
        public created : Date,
        public due : Date,
        public done : boolean,
        public __v: number
    ){}
    
    public static taskFromJson(obj : TaskResponse){
        return new Task(
            obj['name'],
            obj['_id'],
            obj['description'],
            obj['story'],
            obj['created'],
            obj['due'],
            obj['done'],
            obj['__v']
        )
    }
    
}

