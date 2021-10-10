export interface User {
    id: number;
    name: string;
    is_plus: boolean;
    last_login: Date;
    online_status: string;
    picture: Picture;
}

export interface Picture {
    comment: string;
    url: string;
}
