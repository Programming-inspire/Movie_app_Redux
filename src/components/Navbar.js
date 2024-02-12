import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchTerm } from '../redux/Actions';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to={"/"} className="text-2xl font-bold text-white">Movie Hub</Link> 
        </div>

        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for movies or TV shows"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 rounded-md outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/movies" className="p-2 border border-white rounded text-white transition duration-300 hover:bg-white hover:text-black hover:border-black">
            Movies
          </Link>
          <Link to="/tv" className="p-2 border border-white rounded text-white transition duration-300 hover:bg-white hover:text-black hover:border-black">
            TV Shows
          </Link>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm
});

const mapDispatchToProps = {
  setSearchTerm
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);