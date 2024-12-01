'use client';
import React, { useEffect, useState } from 'react';
import { Movie } from './types.ts';
import './editModel.css';

const MoviePage = () => {
  const [MoviePage, setMoviePage] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    director: '',
    releaseDate: ''
  });
  
  const [editMovie, setEditMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies');
        const data = await response.json();
        setMoviePage(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const addMovie = async () => {
    try {
      const response = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      const addedMovie = await response.json();
      setMoviePage([...MoviePage, addedMovie]);
      setNewMovie({ title: '', director: '', releaseDate: '' });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const updateMovie = async (id: number) => {

    const newMovieEdit : Movie = {
      title: editMovie.title,
      director: editMovie.director,
      releaseDate: editMovie.releaseDate
    }
    
    try {
      const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovieEdit),
      });
      
      const updatedMovie = await response.json();
      setMoviePage(MoviePage.map(movie => (movie.id === id ? updatedMovie : movie)));
      setEditMovie(null);
      setNewMovie({ title: '', director: '', releaseDate: '' });
    } catch (error) {
      console.error('Error editing movie:', error);
    }
  };

  const deleteMovie = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',
      });
      setMoviePage(MoviePage.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const openEditModal = (id: number) => {
    const movieToEdit = MoviePage.find(movie => movie.id === id);
    if (movieToEdit) {
      setEditMovie(movieToEdit);
    }
  };

  return (
    <div>
      <h2>MoviePage</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Director"
          value={newMovie.director}
          onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
        />
        <input
          type="date"
          value={newMovie.releaseDate ? new Date(newMovie.releaseDate).toISOString().split('T')[0] : ''}
          onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      {editMovie && (
        <div className="edit-movie-container">
        <h3>Edit Movie</h3>
        <input
          type="text"
          placeholder="Title"
          value={editMovie.title}
          onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Director"
          value={editMovie.director}
          onChange={(e) => setEditMovie({ ...editMovie, director: e.target.value })}
        />
        <input
          type="date"
          value={editMovie.releaseDate ? new Date(editMovie.releaseDate).toISOString().split('T')[0] : ''}
          onChange={(e) => setEditMovie({ ...editMovie, releaseDate: e.target.value })}
        />
        <button onClick={() => updateMovie(editMovie.id)}>Update Movie</button>
      </div>
      )}

      <ul>
        {MoviePage.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Director: {movie.director}</p>
            <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
            <button onClick={() => openEditModal(movie.id)}>Edit</button>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviePage;
