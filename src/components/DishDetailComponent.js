import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


const  renderDish=(dish)=> {

    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}

const  renderComments=(comments) =>{

    if (comments != null) {

        return(
            <div className="">
                <h4>Comments</h4>
                { comments.comments.map((cm) => {
                    return (

                        <ul key={cm.id} className="list-unstyled m-1">
                            <li className="mb-4" >{cm.comment} </li>
                            <li className="mb-"  >--{cm.author} ,  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cm.date)))}</li>

                        </ul>
                    )
                })}
            </div>
        )


    }   else
        return(
            <div></div>
        );


}




const  DishDetails = (props)=>{
    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                {renderDish(props.dishes)}

            </div>

            <div  className="col-12 col-md-5 m-1">
                {renderComments(props.dishes)}
            </div>
        </div>

    );

    }
export default DishDetails;