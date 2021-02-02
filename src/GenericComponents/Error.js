import React from 'react';
import styles from './Error.module.css';

class Error extends React.Component {
    render() {
        return(
            <div className={styles.wrapper}>
                <p>{this.props.error}</p>
            </div>
        );
    }
}

export default Error;