import { User } from "../entities/User";

export class UserViewModel {
    static toHttp({id, email, name, created_at, updatedAt}: User) {
        return {
            id, 
            email, 
            name, 
            created_at, 
            updatedAt
        }
    }
}