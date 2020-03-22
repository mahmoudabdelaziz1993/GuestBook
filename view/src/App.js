import React, { Component } from 'react'
import Join from './components/join/Join'
import Chat  from './components/chat/Chat'
import Register from './components/register/Register'
import {BrowserRouter as Router ,Route} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <Router>
        <Route  path="/" exact component={Join} />
        <Route path ="/signup" exact component={Register}/>
        <Route  path="/chat" exact component={Chat} />
      </Router>
    )
  }
}
export default App;


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
