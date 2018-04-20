var React = require('react');
var PropTypes = require('prop-types');
var ReactRouter = require('react-router-dom');
import Card from "../styled-components/Card"

class ZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
    };

    this.handleSubmitZipcode = this.handleSubmitZipcode.bind(this);
    this.handleUpdateZipcode = this.handleUpdateZipcode.bind(this);
  }
  handleSubmitZipcode () {
    this.props.onSubmitZipcode(this.state.zipcode)

    this.setState(function () {
      return {
        zipcode: ''
      }
    })
  }
  handleUpdateZipcode (e) {
    var zip = e.target.value;
    this.setState(function () {
      return {
        zipcode: zip
      }
    });
  }
  render() {
    return (
      <Card
        className='zipcode-container'
        style={{flexDirection: this.props.direction}}>
          <input
            className="ghost-input"
            onChange={this.handleUpdateZipcode}
            placeholder='City'
            type='text'
            value={this.state.zipcode} />
            <p>or</p>
            <p>use my current location</p>
        <button
          type='button'
          className='ghost-button'
          onClick={this.handleSubmitZipcode}>
            Get Weather
        </button>
      </Card>


              // <div className='home-container' style={{background: "#FC816D"}}>
              //   <fieldset className="card">
              //       <form action="/" method="post">
              //         <input name="city" type="text" className="ghost-input" placeholder="Enter a City" required />
              //         <input type="submit" className="ghost-button" value="Get Weather" />
              //       </form>
              //     <p>or</p>
              //     <p>use my current location</p>
              //   </fieldset>
              // </div>
    )
  }
}

ZipCode.defaultProps = {
  direction: 'column'
}

ZipCode.propTypes = {
  direction: PropTypes.string,
}

module.exports = ZipCode;