import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserBody {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
