export interface GetStoriesResponse {
    status: string;
    data:   Story[];
}



export interface GetStoryResponse {
    status: string;
    data:   Story;
}

export interface PostStoriesResponse {
    status: string;
    data:   Story;
}
export interface StoryResponse{
    name: string,
    _id: string,
    description: string,
    epic: string,
    sprint: string,
    owner: string,
    assignedTo: string[],
    points: number,
    created: Date,
    due: Date,
    started: Date,
    finished:Date,
    status: String,
    icon: String,
    __v: number;
}

export class Story{
    
    constructor(
        public name: string,
        public _id: string,
        public description: string,
        public epic: string,
        public sprint: string,
        public owner: string,
        public assignedTo: string[],
        public points: number,
        public created: Date,
        public due: Date,
        public started: Date,
        public finished: Date,
        public status: String,
        public icon: String,
        public __v: number){
            
    }

    public getName():string {
        return this.name;
    }

    getDescription():string{
        return this.description;
    }
    
    getId():string{
        return this._id;
    }

    public static storyFromJson(obj : StoryResponse){
        return new Story(
            obj['name'],
            obj['_id'],
            obj['description'],
            obj['epic'],
            obj['sprint'],
            obj['owner'],
            obj['assignedTo'],
            obj['points'],
            obj['created'],
            obj['due'],
            obj['started'],
            obj['finished'],
            obj['status'],
            obj['icon'],
            obj['__v']
        )
    }

}