import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDTO {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;
    
    @IsString()
    @IsOptional({ each: true })
    readonly genres: string[];
}