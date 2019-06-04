import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import starRatings from 'react-star-ratings/build/star-ratings';

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
        _id:0,
        Id: 1,
        TITLE: 'testTitle',
        DETAIL: 'testing this detail',
        AUTHOR: 'testAuthor',
        SOURCE: 'testSource',
        CREATE_DATE: moment(),
        RATING: 5
      }
      ],
      avgRating : 0
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
          let average = 0;
          if (data.length) {
            data.forEach(val => {average += val.RATING});
            average = (average / data.length);
          }
          this.setState({ review: data, avgRating : average });
        }
      });

    } else {
      var dataArr = [];
      $.ajax({
        url: '/reviews/all',
        type: 'get',
        dataType: 'json',
        success: (data) => {
          data.forEach(val => {
            dataArr.push({
              _id: val._id,
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
            let average = 0;
            data.forEach(val => {average += val.RATING});
            average = Math.ceil(average / data.length);
            this.setState({ review: dataArr.slice(), avgRating: average });
          }
        }
      });
    }

  }

  render() {

    return (

      <div className = 'ReviewTitle'>
        <span style ={titleStyle}>REVIEWS</span>
        {this.state.avgRating > 0
        ? <StarRatings rating = {Math.round(this.state.avgRating * 2)/2}
           starDimension="24px"
           starSpacing="0px"
           starRatedColor="#393939"
          />
          :<br></br>
        }
      {
          this.state.review.map((rev) =>

            <div className = 'reviewDetail' key={rev._id}>
              <br></br>
              <StarRatings rating = {rev.RATING}
              starDimension="16px"
              starSpacing="0px"
              starRatedColor="#393939"
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

