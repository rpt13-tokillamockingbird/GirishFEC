import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [{
        id: 1,
        title: 'testTitle',
        detail: 'testing this detail',
        author: 'testAuthor',
        source: 'testSource',
        createDate: '06/01/2019',
        rating: 5
      }
      ]
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData() {

  }
  render() {
    return (
      <div>
        {

        this.state.review.map((rev) => (
        <div key = {rev.id}>
        <span>Rating : {rev.rating}</span>
        <br></br>
        <span>Title : {rev.title}</span>
        <br></br>
        <span>Detail : {rev.detail}</span>
        <br></br>
        <span>Author : {rev.author} : Source : {rev.source}</span>
        </div>
        )
        )

        }
      </div>
      );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));