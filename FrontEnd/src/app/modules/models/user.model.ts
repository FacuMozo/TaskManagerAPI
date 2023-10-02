export interface GetUsersResponse {
    status: string;
    data: User[];
}

export interface GetUserResponse {
    status: string;
    data: User;
}

export interface Name {
    first: string;
    last:  string;
}

export interface UserInterface {
    name:     Name;
    _id:      string;
    email:    string;
    username: string;
    __v:      number;
}


export class User {
    constructor(
        public name:     Name,
        public _id:      string,
        public email:    string,
        public username: string,
        public __v:      number
    ){}

    public static UserFromJson( obj : UserInterface){
        return new User( 
            obj['name'],
            obj['_id'],
            obj['email'],
            obj['username'],
            obj['__v']
        )
    }

    getName(){
        return this.name.first+" "+this.name.last;
    }
}