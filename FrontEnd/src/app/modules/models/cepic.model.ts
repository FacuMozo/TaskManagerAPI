import { Project } from "./cproject.model";

export interface Epic {

    project : Project,
    name : string,
    description : string,
    icon : string
}