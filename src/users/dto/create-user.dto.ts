import { IsEmail, IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsInt()
    @Min(0)
    readonly age: number;

    @IsString()
    readonly country: string;

    @IsString()
    readonly city: string;
}