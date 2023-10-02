export interface GetEpicsResponse{
    status: string;
    data: Epica[];
}
export interface PostEpicsResponse{
    status: string;
    data: Epica;
}

export interface Epica{
    _id:         string;
    project:     string;
    name:        string;
    description: string;
    icon:        string;
    __v:         number;
}