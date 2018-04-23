import React, { Component } from 'react';
import { Card, LocationInput } from './styled';
import { withRouter } from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipcode: '',
        };
    }
    handleSubmitZipcode = () => {
        this.props.history.push({
            pathname: '/forecast',
            search: '?city=' + this.state.zipcode,
        });

        this.setState(function() {
            return {
                zipcode: '',
            };
        });
    };
    handleUpdateZipcode = e => {
        let zip = e.target.value;
        this.setState(function() {
            return {
                zipcode: zip,
            };
        });
    };
    render() {
        return (
            <Card style={{ flexDirection: 'column' }}>
                <LocationInput
                    onChange={this.handleUpdateZipcode}
                    placeholder="City"
                    type="text"
                    value={this.state.zipcode}
                />
                <p>or</p>
                <p>
                    use my <a href="">current location</a>
                </p>
                <button
                    type="button"
                    className="ghost-button"
                    onClick={this.handleSubmitZipcode}
                >
                    Get Weather
                </button>
            </Card>
        );
    }
}

const HomeWithRouter = withRouter(Home);
export default HomeWithRouter;
