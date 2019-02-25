import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Validation from "../validation";

class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      Name: "",
      Category: "",
      Success: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = event => {
    event.preventDefault();
    let postData = {
      Name: this.state.Name,
      Category: this.state.Category
    };

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(this.props.history.push('/products'))
    .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

componentDidMount(){
  this.setState({
    Name: this.props.location.state.name,
    Category : this.props.location.state.category
  })
}

  render() {
    //console.log("''",this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Update Product</h4>
        <div className="form-group has-danger">
          <label className="control-label" htmlFor="Name">
            Name
          </label>
          <input
            className={this.state.Name.length > 0 ? "form-control is-valid" : "form-control is-invalid"}
            type="text"
            id="Name"
            name="Name"
            onChange={this.handleInputChange}
            value={this.state.Name}
            placeholder="Insert product name"
            required=""
          />
          {/* <input type="text" class="form-control is-invalid" id="validationServer04" placeholder="State" required=""></input> */}
          <span
            className="text-danger field-validation-valid"
            data-valmsg-for="Name"
            data-valmsg-replace="true"
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="Category">
            Category
          </label>
          <input
            className={this.state.Category.length > 0 ? "form-control is-valid" : "form-control is-invalid"}
            type="text"
            id="Category"
            name="Category"
            onChange={this.handleInputChange}
            value={this.state.Category}
            placeholder="Insert product category"
            required=""
            
          />
          <span
            className="text-danger field-validation-valid"
            data-valmsg-for="Category"
            data-valmsg-replace="true"
          />
        </div>
        <div className="form-group">
          <button 
          className="btn btn-primary"
          disabled={!this.state.Category && !this.state.Name}
          >Update</button>
        </div>
        <Validation />
      </form>
    );
  }
}

export default NewProduct;
