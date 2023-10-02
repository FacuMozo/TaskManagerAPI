

export interface GetProjectsResponse {
    status: string;
    data:   Project[];
}

export interface ProjectResponse {
    members:     string[];
    _id:         string;
    name:        string;
    description: string;
    owner:       string;
    icon:        string;
    __v:         number;
}

export interface PostProjectsResponse {
    status: string;
    data:   Project;
}



export class Project{
    
    constructor(
        public members:string[],
        public _id: string,
        public name: string,
        public description: string,
        public owner: string,
        public icon: string,
        public __v: number){
            
    }

    public getName():string {
        return this.name;
    }

    getMembers():string[]{
        return this.members;
    }

    getDescription():string{
        return this.description;
    }
    
    getId():string{
        return this._id;
    }

    public static projectFromJson(obj : ProjectResponse){
        return new Project(
            obj['members'],
            obj['_id'],
            obj['name'],
            obj['description'],
            obj['owner'],
            obj['icon'],
            obj['__v']
        )
    }

}