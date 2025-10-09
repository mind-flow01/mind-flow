import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePsicologoBody {
    @IsNotEmpty() @IsString() name: string;
    @IsEmail() email: string;
    @MinLength(6) password: string;

    @IsNotEmpty() @IsString() crp: string;
}