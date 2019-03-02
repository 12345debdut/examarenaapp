import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import {Container,Row,Col} from 'reactstrap';
import User from '../components/user';
import Profile from '../components/layout/profile';
import { fire } from '../firebase/firebase';
export default class ProfilePage extends React.Component{

	constructor(props){
		super(props)
		this.state={
            signup:false,
            user:{},
            isloading:true
        }
    }
     componentWillMount(){
        const {username}=this.props.auth;       
        const database=fire.database().ref(`users/${username}`)
        database.once('value',(snap)=>{
            var userinfo=snap.val();
            this.setState({user:userinfo})
            this.setState({isloading:false})
        },(err)=>{
            console.log(err.message);
        })
    }
	render()
	{
        const {signup}=this.state;
        const {isAuthenticated}=this.props.auth;
        const {isloading}=this.state;
        const {username}=this.props.auth;       
        if(!isAuthenticated)
        {
            return(
                <User auth={this.props.auth}/>
            );
        }
        if(isloading)
        {
            return(
                <BaseLayout {...this.props.auth}
                title="Exam Arena">
                    <div className="loading-div">
                        <p className="loading-title">Wait a while......</p>
                    </div>
              </BaseLayout>	
            );
        }
		return(
			<BaseLayout {...this.props.auth}
			title="Exam Arena User Profile Page">
				<div>
					<Profile user={this.state.user}/>
				</div>
		  </BaseLayout>		  
		);
	}
}