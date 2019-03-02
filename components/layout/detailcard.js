import React from 'react'
import {Card,CardBody,CardText,CardFooter,CardHeader} from 'reactstrap'
export default class DetailCard extends React.Component{
    render()
    {
        const {questionText,questionImage,Correct,index}=this.props;
        return(
            <Card className="card-detail1">
            <CardHeader className="card-header1">
                <CardText>
                <p className="text-style1">Question {index}</p>
                </CardText>
            </CardHeader>
                <CardBody className="card-body1">
                    <CardText>
                    <pre className="breakword">{questionText}</pre>
                    </CardText>
                    <CardText>
                    <img src={questionImage}/>
                    </CardText>
                    </CardBody>
                    <CardFooter className="card-footer1">
                    <p className="text-style1">Correct Option: {Correct}</p>
                    </CardFooter>
            </Card>
        );
    }
}