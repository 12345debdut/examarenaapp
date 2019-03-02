import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import Card from '../components/form/card';
export default class Login extends React.Component{
	constructor(props){
		super(props)
		this.state={
			signup:false
		}
		this.onSignUpToggle=this.onSignUpToggle.bind(this);
	}
	onSignUpToggle(){
	}
	render()
	{
        const {signup}=this.state;
        const {isAuthenticated}=this.props.auth;
        if(isAuthenticated)
        {
            return(
                <BaseLayout {...this.props.auth}
                title="Exam Arena Login Page">
                    <div className="base-style">
                        <p style={{paddingTop:150,fontSize:30,color:'white'}}>You have already logged in</p>
                    </div>
              </BaseLayout>
            );
        }
		return(
			<BaseLayout
            title="Exam Arena Login Page">
                <div className="base-style">
                    <Card onClick={this.onSignUpToggle}/>
				</div>
		  </BaseLayout>		  
		);
	}
}