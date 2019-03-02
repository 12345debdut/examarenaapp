import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
export default class ProfileCard extends React.Component{
    render()
    {
        const {user}=this.props;
        return(
            <div className="profile-div">
            <Card className="profile-card">
            <CardBody>
            <div className="individual-style">
                <CardTitle className="profile-title">Email Address</CardTitle>
                <CardText className="profile-text">{user.email}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">Name</CardTitle>
                <CardText className="profile-text">{user.name}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">User Name</CardTitle>
                <CardText className="profile-text">{user.username}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">Phonenumber</CardTitle>
                <CardText className="profile-text">{user.phonenumber}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">Batchtiming</CardTitle>
                <CardText className="profile-text">{user.batchtiming}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">JEE Main Percentage</CardTitle>
                <CardText className="profile-text">{user.jepercentage}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">JEE Main rating</CardTitle>
                <CardText className="profile-text">{user.jerating}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">WBJEE Rating</CardTitle>
                <CardText className="profile-text">{user.wbrating}</CardText>
            </div>
            <hr/>
                <div className="individual-style">
                <CardTitle className="profile-title">WBJEE Percentage</CardTitle>
                <CardText className="profile-text">{user.wbpercentage}</CardText>
            </div>
            </CardBody>
        </Card>
        </div>
        );
    }
}