import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDTO } from './DTO/create-movie.dto';
import { UpdateMovieDTO } from './DTO/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query('year') year: string){
        return `searching year: ${year}`
    }

    @Get("/:movieID")
    getOne(@Param('movieID') movieID: string): Movie {
        
        return this.moviesService.getOne(movieID);
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO) {
        console.log(movieData);

        return this.moviesService.create(movieData);
    }

    @Delete("/:movieID")
    remove(@Param('movieID') movieID: string) {
        return this.moviesService.deleteOne(movieID);
    }

    @Put("/:movieID")
    update(@Param('movieID') movieID: string, @Body() updateData: UpdateMovieDTO) {
        return this.moviesService.update(movieID, updateData);
    }

    
}
