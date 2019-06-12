import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){

    return (
      <Index />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('reviewId'));