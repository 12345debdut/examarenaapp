import React from 'react'
import 
{Card,
CardBody,
CardText,
CardHeader,
CardFooter,
Button
} from 'reactstrap';
export default class Notice extends React.Component{
    render(){
        return(
            <Card className="notice-card">
                <CardHeader style={{color:'white'}}>
                    Notice {this.props.title}
                </CardHeader>
                <CardBody>
                    <CardText style={{color:'white'}}>
                        {this.props.text}
                        {
                            this.props.docs &&
                            <a href={this.props.docs}>Download pdf</a>
                        }
                    </CardText>
                </CardBody>
                <CardFooter style={{color:'white'}}>
                        {this.props.date &&
                        <p>{this.props.date}</p>
                        }
                </CardFooter>
            </Card>
        );
    }
}