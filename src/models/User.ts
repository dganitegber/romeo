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

export interface UserProfile {
    headline: string;
    id: number;
    location: {
        area: string;
        city: string;
        country: string;
        distance: number;
        name: string;
    };
    personal: {
        age: 20;
        body_hair: string;
        body_type: string;
        ethnicity: string;
        eye_color: string;
        height: {
            cm: number;
        };
        relationship: string;
        smoker: string;
        weight: {
            kg: number;
        };
    };
    sexual: {
        anal_position: string;
        safer_sex: string;
        sm: string;
    };
    is_plus: false;
}
