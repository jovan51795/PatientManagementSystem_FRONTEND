export interface User {
    id?: number;
    firstname?: string;
    lastname?:string;
    email?:string,
    password?:string;
    phonenumber: string,
    role: Role
}

enum Role {
    admin,
    user
}

export interface Token {
    token?: string
}
