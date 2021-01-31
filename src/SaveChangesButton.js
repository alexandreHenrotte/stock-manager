//import styles from "./SaveChangesButton.module.css"
import React from 'react';

class SaveChangesButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.saveChanges}>Save changes</button>
        );
    }
}



export default SaveChangesButton;