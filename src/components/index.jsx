import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
import StarRatings from 'react-star-ratings';

const titleStyle = {
  'fontSize' : '19px',
  'fontWeight' : 700,
  'marginBottom' : '15px',
  'fontFamily' : 'Brandon Text, sans-serif',
  color : 'rgb(57, 57, 57)',
  display : 'block'
};

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
          console.log('Before setState: ', this.state.review);
          this.setState({ review: data }, ()=>console.log('After setState ', this.state.review));
        }
      });

    } else {

      console.log('In else of route');
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
    let rev = this.state.review[0];
    console.log('In render rev : ', rev);


    return (

      <div>
        <span style ={titleStyle}>REVIEWS</span>
      {
          this.state.review.map((rev) =>

            <div key={rev.Id}>
              <br></br>
              <StarRatings rating = {rev.RATING}
              starDimension="24px"
              />
              <br></br>
              <span>Title : {rev.TITLE}</span>
              <br></br>
              <span>Detail : {rev.DETAIL}</span>
              <br></br>
              <span>Author : {rev.AUTHOR} : Source : {rev.SOURCE}</span>
              <br></br>
              <span>Date : {moment(rev.CREATE_DATE).format("MMM DD, YYYY")}</span>
            </div>
          )
      }
      </div>


    );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));

