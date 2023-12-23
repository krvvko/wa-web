export interface Job {
    id: string;
    profilePicture: string;
    picture: string | null,
    name: string;
    date: Date;
    description: string;
    requirements: string[];
    contacts: string[];
}

export interface JobDataFromServer {
    id: string;
    pfp: string;
    picture: string | null;
    name: string;
    date: string;
    description: string;
    requirements: string;
    contacts: string;
}

export interface HeaderSearchProps {
    apiRoute: string;
}

export interface HeaderSearchServerData {
    id: string;
    name: string;
}

export interface ConfigInterface {
    serverURL: string;
}