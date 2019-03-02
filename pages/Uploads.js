import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import User from '../components/user';
export default class Uploads extends React.Component{
	constructor(props){
		super(props)
		this.state={
			signup:false
		}
		this.onSignUpToggle=this.onSignUpToggle.bind(this);
	}
	onSignUpToggle(){
		this.setState({signup:!this.state.signup});
	}
	render()
	{
        const {isSiteOwner}=this.props.auth;
        if(!isSiteOwner)
        {
            return(
                <User auth={this.props.auth}/>
            );
        }
		return(
			<BaseLayout {...this.props.auth}
			title="Exam Arena admin-upload page">
				<div></div>
		  </BaseLayout>		  
		);
	}
}