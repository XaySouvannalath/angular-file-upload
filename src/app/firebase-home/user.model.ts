export class Users {
    constructor(
        public USERID: string,
        public NAME: string,
        public LASTNAME: string
    ){}
}

export interface iUser {
    USERID: string;
    NAME: string;
    LASTNAME: string;
}