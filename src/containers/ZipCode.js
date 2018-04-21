import React from 'react';
import PropTypes from 'prop-types';
import Card from "../styled-components/Card";
import LocationInput from "../styled-components/LocationInput";

class ZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
    };
  }
  handleSubmitZipcode = () => {
    this.props.onSubmitZipcode(this.state.zipcode)

    this.setState(function () {
      return {
        zipcode: ''
      }
    })
  }
  handleUpdateZipcode = (e) => {
    var zip = e.target.value;
    this.setState(function () {
      return {
        zipcode: zip
      }
    });
  }
  render() {
    return (
      <Card style={{flexDirection: this.props.direction}}>
          <LocationInput
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
    )
  }
}

ZipCode.propTypes = {
  direction: PropTypes.string,

};

ZipCode.defaultProps = {
  direction: 'column'
}

export default ZipCode;