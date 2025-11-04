import { Role, User } from "../entities/User";

export class UserViewModel {
    static toHttp({id, email, name, role, created_at, updatedAt}: User) {
        return {
            id, 
            email, 
            name, 
            role,
            created_at, 
            updatedAt
        }
    }
}