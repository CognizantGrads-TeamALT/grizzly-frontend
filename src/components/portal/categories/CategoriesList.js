import React, { Component } from "react";
import CategoryForm from "../categories/CategoryForm";
import ConfirmModal from "../common/ConfirmModal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { updateCategoryProd } from "../../../actions/productsActions";
import { toggleBlockCategory, deleteCategory } from "../../../actions/categoryActions";
import ErrorComponent from "../../common/ErrorComponent";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    }
    this.onBlockClick = this.onBlockClick.bind(this);
    this.waitForResponce = this.waitForResponce.bind(this);
    this.closeError=this.closeError.bind(this);
  }

  closeError(){
    this.setState({showError:false})
  }

  onDeleteClick(id) {
    this.props.deleteCategory(id);
        //begin checking for an error
    this.setState({listenForError: true,
      count: 0,
    intervalId: setInterval(this.waitForResponce, 10)})
  }

  onBlockClick() {
    const { category } = this.props;
    this.props.toggleBlockCategory(category.categoryId, !category.enabled);

    let copyCat = category;
    copyCat.enabled = !copyCat.enabled;
    this.props.updateCategoryProd(category.categoryId, copyCat);
    //begin checking for an error
    this.setState({listenForError: true,
      block: true,
      count: 0,
    intervalId: setInterval(this.waitForResponce, 100)})
  }

  waitForResponce(){
    //check for error, if so, set it to display
    if(this.props.errors.errorMessage !== "" && this.state.listenForError){
      this.setState({showError:true,
      listenForError: false})
      if(this.state.block){
        this.setState({block:false});
      }
      clearInterval(this.state.intervalId) 
    }
    else if(this.state.count> 5){
      clearInterval(this.state.intervalId);
      this.setState({listenForError:false})}
      
    else this.setState({count: this.state.count+1})
    
  }

  render() {
    const { category } = this.props;
    if (category !== null && category !== undefined) {
      return (
        <tr>
          <th scope="row">{category.name}</th>
          <td>{category.description}</td>
          <td>{category.productCount}</td>
          <td>
            <div className="row">
              <div className="col pr-0">
                <CategoryForm
                  category={category}
                  buttonLabel="Edit"
                  title="Edit Category"
                  actionLabel="Edit"
                  buttonClass="btn more-rounded blue-b btn-sm mr-sm-2 d-inline"
                />
              </div>
            <div className="col p-0">
                <ConfirmModal
                  buttonLabel={category.enabled ? "Block" : "Unblock"}
                  title="Block Category"
                  confirmText={(category.enabled ? "Block" : "Unblock") + " " + category.name}
                  buttonClass="btn more-rounded orange-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onBlockClick}
                />
            </div>
            <div className="col p-0">
              <ConfirmModal
                  buttonLabel="Delete"
                  title="Delete Category"
                  confirmText={"Delete " + category.name}
                  buttonClass="btn more-rounded red-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onDeleteClick.bind(this, category.categoryId)}
                />
                {/*shows error on toggle as a popup*/}
              <ErrorComponent 
                errormsg={this.props.errors.errorMessage} 
                popup={true} 
                show={this.state.showError} 
                closeError={this.closeError} />
                
            </div>
          </div>
          </td>
        </tr>
      );
    } else {
      return (<Spinner size={'150px'}/>);
    }
  }
}

CategoriesList.propTypes = {
  toggleBlockCategory: PropTypes.func.isRequired,
  updateCategoryProd: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { toggleBlockCategory, deleteCategory, updateCategoryProd }
)(CategoriesList);