import styles from "./ProductForm.module.css"
import React from 'react';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName : '',
        };
      }

      

      /*productAlreadyExists = () => {
        fetch(`http://192.168.0.21:9000/products`)
        .then(res => res.json())
        .then(
            (result) => {
              result.forEach(product => {
                if (product.name === this.state.productName) {
                  this.setState.productNameValid = false;
                }
              })
            },
        )
      }*/

      nameInputIsValid = () => {
        var regex = new RegExp("^[A-Za-z\\_\\-]*$");
        return regex.test(this.state.productName);
      }

      formButtonAction = () => {
        if (this.nameInputIsValid())
          this.props.addProduct(this.state.productName);
        else
          alert("The name of the product can only contain letters and space");
      }
    
      handleChange = (event) => {
        this.setState({productName : event.target.value});
      }

    render() {
        return (
            <form onChange={this.handleChange}>
              <label htmlFor="title">Nom du produit</label>
              <input type="text" name="name" id="title"></input>
              <button type="button" onClick={this.formButtonAction} className={styles.add_product_button}>Add Product</button>
            </form>
        );
    }
}



export default ProductForm;