import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';
import Home from './components/Home';
import TV from './components/Tv';
import Movies from './components/Movies';
import DetailPage from './components/DetailPage';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/movies' element={<Movies/>}/>
                    <Route path="/tv" element={<TV />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
