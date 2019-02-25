import React, { Component } from "react";
import Validation from "../validation";
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []      
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result,
            name:null,
            category:null
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleClick(el) {
    console.log(el)
    // <Redirect to='/componentURL' />
      this.props.history.push('/dashboard')
   
  }

  setRedirect = (name,category) => {
    console.log(name,category)
    this.setState({
      redirect: true,
      name:name,
      category:category
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect  to={{
        pathname: '/updateproduct',
        state: { name:this.state.name, category:this.state.category }
    }}/>
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <p>Error: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      
      return (
        
          <ul>{this.renderRedirect()}
            {items.map(item => (
              <li className="p-2" key={item.id}>
                {item.name} - {item.category} <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.setRedirect(item.name, item.category)} value1={1}>Update</button> 
              </li>
            ))}
          </ul>
      );
    }
  }
}

class Products extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="display-4">Products</h1>
        <ProductList />
        <Validation />
      </React.Fragment>
    );
  }
}
export default withRouter(Products);
