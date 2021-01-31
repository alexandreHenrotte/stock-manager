import styles from "./ProductWrapper.module.css";
import ProductForm from './ProductForm';
import SaveChangesButton from './SaveChangesButton';
import ProductCard from './ProductCard';
import React from 'react';

class ProductWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error : null,
            isLoaded : false,
            isUpdated : true,
            products : [],
            productsToAdd : [],
            productsToUpdate : [],
            productsToDelete : []
        }
    }

    productAlreadyExists = (productName) => {
        var sameProductFound = false;

        this.state.products.forEach(product => {
            if (product.name === productName)
                sameProductFound = true;
        })
        return sameProductFound
    }

    addProduct = (productName) => {
        if (!this.productAlreadyExists(productName)) {
            var newProduct = {
                name : productName,
                count : 0
            }
            this.state.products.push(newProduct);
            this.state.productsToAdd.push(newProduct);
            this.showProducts();
        }  
    }

    deleteProduct = (productName) => {
        console.log(productName)
        this.state.products.forEach(product => {
            if (product.name === productName) {
                var indexOfProductToDelete = this.state.products.indexOf(product);
                this.state.products.splice(indexOfProductToDelete, 1);
            }
        })
        this.state.productsToDelete.push(productName);
        this.showProducts();
    }

    setProductToUpdate = (productToUpdate) => {
        var productFound = false;
        this.state.productsToUpdate.forEach(product => {
            if (product.name === productToUpdate.name) {
                product.count = productToUpdate.count
                productFound = true;
            }
        })

        if (!productFound)
            this.state.productsToUpdate.push(productToUpdate);
        
    }

    saveChanges = () => {   
        if (this.state.productsToAdd.length > 0) {
            this.state.productsToAdd.forEach(productToAdd => {
                fetch(`http://192.168.0.21:9000/products/`, { method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                }, body: JSON.stringify({ name: productToAdd.name }) })
            })
            this.setState({productsToAdd : []});
        }

        if (this.state.productsToUpdate.length > 0) {
            this.state.productsToUpdate.forEach(productToUpdate => {
                fetch(`http://192.168.0.21:9000/products/${productToUpdate.name}?count=${productToUpdate.count}`, { method: 'PUT' })
            })
            this.setState({productsToUpdate : []});
        }


        if (this.state.productsToDelete.length > 0) {
            this.state.productsToDelete.forEach(productToDelete => {
                fetch(`http://192.168.0.21:9000/products/${productToDelete}`, { method: 'DELETE' })
            })
        }
    }

    showProducts = () => {
        this.forceUpdate()
    }

    fetchProducts = () => {
        fetch("http://192.168.0.21:9000/products")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    products : result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidMount() {
        this.fetchProducts();
    }

    render() {
        const { error, isLoaded, products } = this.state;
        if (error) {
        return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Chargement…</div>;
        } else {
        return (
                <div className={styles.product_wrapper}>
                    <ProductForm addProduct={this.addProduct} />
                    <SaveChangesButton saveChanges={this.saveChanges}></SaveChangesButton>
                    {
                        products.map(product => (
                            <ProductCard key={product.name} setProductToUpdate={this.setProductToUpdate} deleteProduct={this.deleteProduct} productName={product.name} productCount={product.count} />
                        ))
                    }
                </div>
            );
        }
    }
}



export default ProductWrapper;