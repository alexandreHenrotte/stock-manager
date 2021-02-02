import React from 'react';
import styles from "./ProductCard.module.css"

class ProductCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productName : props.productName,
            productCount : props.productCount,
        }
    }

    incrementProductCount = () => { 
        var oldCount = this.state.productCount;
        var newCount = oldCount + 1;
        this.updateProductState({
            name : this.state.productName,
            count : newCount
        });
    }
    decrementProductCount = () => {
        var oldCount = this.state.productCount;
        var newCount = oldCount - 1;
        if (this.state.productCount > 0) {
            this.updateProductState({
                name : this.state.productName,
                count : newCount
            });
        }
    }
    updateProductState = (productToUpdate) => {
        this.setState({ productCount : productToUpdate.count}, () => this.props.setProductToUpdate(productToUpdate));
    }

    /*deleteProduct = () => {
        fetch(`http://192.168.0.21:9000/products/${this.state.productName}`, { method: 'DELETE' })
    }*/

    render() {
        return (
            <div className={styles.product_card}>
                <button id={styles.delete_product_button} onClick={() => this.props.deleteProduct(this.state.productName)}>X</button>
                <span>{this.state.productName}</span>
                <span>{this.state.productCount}</span>
                <div className={styles.add_remove_button_wrapper}>
                    <button onClick={this.incrementProductCount}>+</button>
                    <button onClick={this.decrementProductCount}>-</button>
                </div>
            </div>
        );
    }
}



export default ProductCard;