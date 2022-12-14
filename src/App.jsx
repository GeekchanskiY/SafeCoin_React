import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Error404 from './components/error404';
import CryptoList from './components/list';
import Intro from './components/intro';
import CryptoDetail from './components/cryptodetail';
import store from './app/store'
import { Provider } from 'react-redux'
import Login from './components/login';


class Test extends React.Component{
  render(){
    return <div>aaa</div>
  }
}
class Test1 extends React.Component{
  render(){
    return <div>bbb</div>
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header></Header>
          <div className='bodywrapper' >
            <Routes>
                <Route path='/' element={<Intro/>}/>
                <Route path='/a' element={<Test1/>}/>
                <Route path='/list' element={<CryptoList/>}/>
                <Route path='/crypto/:name' element={<CryptoDetail/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<Error404/>}/>

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
