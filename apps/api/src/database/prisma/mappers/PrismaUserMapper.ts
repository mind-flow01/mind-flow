import { User as PrismaUser } from "generated/prisma";
import { Role, User, AccountStatus } from "src/modules/user/entities/User"; // Importe o enum AccountStatus

export class PrismaUserMapper {
    static toPrisma(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            phone: user.phone,
            photo_url: user.photo_url,
            account_status: user.account_status,
        };
    }
    
    static toDomain(raw: PrismaUser): User {
        return new User(
            {
                name: raw.name,
                email: raw.email,
                password: raw.password,
                role: raw.role as Role,
                phone: raw.phone,
                photo_url: raw.photo_url,
                account_status: raw.account_status as AccountStatus,
                created_at: raw.created_at,
                updatedAt: raw.updatedAt,
            },
            raw.id,
        );
    }
}