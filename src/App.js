// ./containers/App.js
import React from 'react';
import { hot } from 'react-hot-loader';
 
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
    </div>
  );
}
 
export default hot(module)(App);