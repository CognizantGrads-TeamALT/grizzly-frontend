constructor() {
  super();
  this.state = {
    options : null
    ...
  };

  ...

  this.populate();
}

populate() {
  this.props.getCategories(“0”); // Or search with delay after typing
var options = [];
categories.map(category => (
options.add({id: category.id, 
  name: category.name})
));

this.setState({
  options: options
});

}


<SelectListGroup
placeholder=“Category”
name=“category”
value={this.state.category}
onChange={this.onChange}
options={this.state.options}
/>