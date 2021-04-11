import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './DTO/create-movie.dto';
import { UpdateMovieDTO } from './DTO/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie{
        const getOne_Result = this.movies.find(movie => movie.id === parseInt(id));

        if(!getOne_Result){
            throw new NotFoundException(`MovieID: ${id} Not Found`);
        }
        return getOne_Result;
    }

    deleteOne(movieID: string){
        this.getOne(movieID);
        
        this.movies = this.movies.filter(movie => movie.id !== parseInt(movieID));
    }

    create(movieData: CreateMovieDTO){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id: string, updateData: UpdateMovieDTO) {
        const getOne_Result = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...getOne_Result, ...updateData})

    }
}
