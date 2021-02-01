import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ModalHeader,
    ModalBody,

    Label,

    Button,

    Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {

            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishID, values.rating, values.author, values.comment);

        // event.preventDefault();
    }

    render() {
        return (
            <div className="col-12 col-md-5">

                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label className="ml-3" htmlFor="rating" sm={2}>Rating</Label>

                                    <Control.select model=".rating" name="rating"
                                                    className="form-control m-3">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>

                            </Row>
                            <Row className="form-group">
                                <Label className="ml-3"  htmlFor="yourName" >Your Name</Label>

                                    <Control.text model=".yourName" id="yourName" name="yourName"
                                                  placeholder="Your Name"
                                                  className="form-control m-3"
                                                  validators={{
                                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                            </Row>

                            <Row className="form-group">
                                <Label  className="ml-3" htmlFor="comment" >Comment</Label>

                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      rows="6"
                                                      className="form-control m-3" />

                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, }}>
                                    <Button type="submit" color="primary">
                                       submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

const  RenderDish=(props)=> {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return(
            <div className="col-12 col-md-5">
            <Card>
                <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
                <CardBody>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    else
        return(
            <div></div>
        );
}

const  RenderComments=({comments, postComment, dishId}) =>{
    console.log(comments)
    if (comments != null) {
        return(
            <div className="">
                <div className="col-12 col-md">
                <h4>Comments </h4>

                { comments.map((cm) => {
                    return (

                        <ul key={cm.id} className="list-unstyled m-1">
                            <li className="mb-4" >{cm.comment} </li>
                            <li className="mb-"  >--{cm.author} ,  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cm.date)))}</li>

                        </ul>
                    )
                })}
                </div>
                <div>
                    <CommentForm dishID={dishId} postComment={postComment} />
                </div>

            </div>
        )


    }   else
        return(
            <div></div>
        );


}




const  DishDetails = (props)=>{

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">

                    <RenderDish dish={props.dish} />

                    <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}/>



            </div>
        </div>
    );

    }
export default DishDetails;