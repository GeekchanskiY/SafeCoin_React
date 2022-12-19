// react
import store from './app/store'
import { Provider } from 'react-redux'
import React from 'react';
import {Routes, Route} from "react-router-dom";

// components
import Header from './components/main/header';
import Footer from './components/main/footer';
import Error404 from './components/main/error404';
import CryptoList from './components/crypto/list';
import Intro from './components/intro/intro';
import CryptoDetail from './components/crypto/cryptodetail';
import Login from './components/users/login';
import Register from './components/users/register';
import UserDetail from './components/users/user_detail';
import News from './components/news/News';
import NewsDetail from './components/news/NewsDetail';

// styles
import './styles/main/app.scss'
import './styles/main/footer.scss'
import './styles/main/header.scss'

import './styles/news/news.scss'
import './styles/news/detail.scss'

import './styles/crypto/detail.scss'
import './styles/crypto/crypto.scss'

import './styles/intro/intro.scss'

import './styles/users/logregform.scss'
import './styles/users/userdetail.scss'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header></Header>
          <div className='bodywrapper' >
            <Routes>
                <Route path='/' element={<Intro/>}/>
                <Route path='/list' element={<CryptoList/>}/>
                <Route path='/crypto/:name' element={<CryptoDetail/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/user' element={<UserDetail/>} />
                <Route path='/user/:id' element={<UserDetail/>} />
                <Route path='*' element={<Error404/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/news/:id' element={<NewsDetail/>}/>

            </Routes>
          </div>
          <br/>
          <Footer></Footer>
          <div style={{width: '100%', textAlign: 'center'}}>
            <span>Курсовой проект Астровского Дмитрия</span>
          </div>
          
        </div>
      </Provider>
    );
  }
}

export default App;
