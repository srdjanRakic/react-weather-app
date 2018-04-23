import React from 'react';
import Spinner from './styled';

const Loading = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <Spinner />;
    } else if (error) {
        // Handle the error state
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export default Loading;
