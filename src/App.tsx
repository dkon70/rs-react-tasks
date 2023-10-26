import './App.scss';
import { Component } from 'react';
import Header from './widgets/Header/Header';
import Main from './widgets/Main/Main';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    )
  }

}

export default App;
