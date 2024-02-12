import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovieDetails, fetchMovieCredits } from '../redux/Actions';

const DetailPage = ({ movieDetails, movieCredits, fetchDetails, fetchCredits }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchDetails(id);
    fetchCredits(id);
  }, [id, fetchDetails, fetchCredits]);

  return (
    <div className="container mx-auto my-8 text-center">
      {movieDetails && movieCredits && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-full h-80 object-fit rounded-md mb-4"
          />
          <h2 className="text-black text-lg font-bold mb-2">{movieDetails.title}</h2>
          <h3 className="text-gray-400 mb-4">Cast & Crew:</h3>
          <div className="flex flex-wrap">
            {movieCredits.cast.map((cast) => (
              <div key={cast.id} className="mx-3 mb-4 text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt={cast.name}
                  className="w-24 h-36 object-fill rounded-md mb-2"
                />
                <p className="text-black">{cast.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  movieDetails: state.movieDetails,
  movieCredits: state.movieCredits
});

const mapDispatchToProps = (dispatch) => ({
  fetchDetails: (id) => dispatch(fetchMovieDetails(id)),
  fetchCredits: (id) => dispatch(fetchMovieCredits(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
