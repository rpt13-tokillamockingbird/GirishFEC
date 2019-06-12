import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
import StarRatings from 'react-star-ratings';
// import starRatings from 'react-star-ratings/build/star-ratings';

const titleStyle = {
  'fontSize': '16px',
  'fontWeight': 700,
  'marginBottom': '15px',
  'fontFamily': 'Brandon Text, sans-serif',
  'color': 'rgb(57, 57, 57)',
  'display': 'block'


};
const buttonStyle = {
  'borderWidth': '1px',
  'borderRadius': 0,
  'borderStyle': 'solid',
  'fontSize': '13px',
  'height': '50px',
  // 'width': '100%',
  'alignItems': 'center',
  'padding': '0 30px',
  'justifyContent': 'center',
  'cursor': 'pointer',
  'textDecoration': 'none',
  'color': '#393939'
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [{
        _id: 0,
        Id: 1,
        TITLE: 'testTitle',
        DETAIL: 'testing this detail',
        AUTHOR: 'testAuthor',
        SOURCE: 'testSource',
        CREATE_DATE: moment(),
        RATING: 5
      }
      ],
      avgRating: 0
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
            data.forEach(val => { average += val.RATING });
            average = (average / data.length);
          }
          this.setState({ review: data, avgRating: average });
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
            data.forEach(val => { average += val.RATING });
            average = Math.ceil(average / data.length);
            this.setState({ review: dataArr.slice(), avgRating: average });
          }
        }
      });
    }

  }

  render() {

    return (
      <div className='Reviews'>
        <div className='ReviewTitle' >
          <span style={titleStyle}>REVIEWS</span>
          {this.state.avgRating > 0
            ? <div>
              <div style={{float:'left'}}>
              <StarRatings rating={Math.round(this.state.avgRating * 2) / 2}
                starDimension="24px"
                starSpacing="0px"
                starRatedColor="#393939"
              />
              <span>  ({this.state.review.length})</span>
              </div>
              <div style={{float:'left', marginLeft: '30%'}}>
              <div>
                <strong>Fit rating:</strong>
                <span> runs true to size</span>
              </div>
              <div>
                <strong>Width rating:</strong>
                <span> runs true to size</span>
              </div>
              </div>
            </div>
            : <br></br>
          }
        </div>
        <div className="reviewButton" style={{float:'right'}}>
          <a href="" role="button" style={buttonStyle}>
            <span>Write a Review</span></a>
        </div>
        {
          this.state.review.map((rev) =>

            <div className='reviewDetail' key={rev._id}>
              <br></br>
              <StarRatings rating={rev.RATING}
                starDimension="16px"
                starSpacing="0px"
                starRatedColor="#393939"
              />
              <br></br>
              <strong>{rev.TITLE}</strong>
              <br></br>
              <span> {rev.DETAIL}</span>
              <br></br>
              <span> {rev.AUTHOR} | {rev.SOURCE}</span>
              <br></br>
              <div>
                <span>{moment(rev.CREATE_DATE).format("MMM DD, YYYY")}</span>
              </div>
            </div>
          )
        }
      </div>


    );

  }
}

export default Index;
// module.exports = App;
// ReactDOM.render(<App />, document.getElementById('app'));



