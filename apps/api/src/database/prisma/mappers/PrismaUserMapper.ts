import { User } from "src/modules/user/entities/User";
import { User as PrismaUser } from "generated/prisma";
export class PrismaUserMapper {
    static toPrisma({id, email, name, password, created_at, updatedAt }: User): PrismaUser {
        return {id, email, name, password, created_at, updatedAt};
    }
}