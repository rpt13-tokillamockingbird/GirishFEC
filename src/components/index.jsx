import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [{
        Id: 1,
        TITLE: 'testTitle',
        DETAIL: 'testing this detail',
        AUTHOR: 'testAuthor',
        SOURCE: 'testSource',
        CREATE_DATE: '06/01/2019',
        RATING: 5
      }
      ]
    }
  }
  componentDidMount() {
    let route = window.location.pathname;
    if (route !== '/') {
      route = route.substring(1, route.length - 1);
      $.ajax({
        url: `/review/${route}`,
        type: 'get',
        dataType: 'json',
        success: (data) => {
          console.log('in route /id : ', data);
          this.setState({ review: data });

        }
      });
    } else {
      console.log('In else');
      var dataArr = [];
      $.ajax({
        url: '/reviews/all',
        type: 'get',
        dataType: 'json',
        success: (data) => {
          data.forEach(val => {
            dataArr.push({
              Id: val.Id,
              TITLE: val.TITLE,
              DETAIL: val.DETAIL,
              AUTHOR: val.AUTHOR,
              SOURCE: val.SOURCE,
              CREATE_DATE: val.CREATE_DATE,
              RATING: val.RATING
            })
          });
          if (dataArr.length) {
            console.log('dataArr :', dataArr);
            this.setState({ review: dataArr.slice() });
          }
        }
      });
    }

  }

  render() {
    // let rev = this.state.review[0];
    // console.log('In render rev : ', rev);


    return (
      <div>

        {
          this.state.review.map((rev) => {
            <div key={rev.Id}>
              <span>Rating : {rev.RATING}</span>
              <br></br>
              <span>Title : {rev.TITLE}</span>
              <br></br>
              <span>Detail : {rev.DETAIL}</span>
              <br></br>
              <span>Author : {rev.AUTHOR} : Source : {rev.SOURCE}</span>
            </div>
          }
          )
        }
      </div>


    );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//     <div key={rev.id}>
//       <span>Rating : {rev.rating}</span>
//       <br></br>
//       <span>Title : {rev.title}</span>
//       <br></br>
//       <span>Detail : {rev.detail}</span>
//       <br></br>
//       <span>Author : {rev.author} : Source : {rev.source}</span>
//     </div>
//   }
//   )
// }