
// Payload of creation for JWT (Json Web Token)
export interface JwtPayload{
    id:string;
    roles:string[];
    name: string;
    last_name: string;
    email: string;
}