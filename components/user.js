import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
export default class User extends React.Component{
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
		return(
			<BaseLayout {...this.props.auth}
			title="Unauthorized access">
                <div>
                <p style={{paddingTop:150,color:'white',fontSize:40}}>You are not authorized to access data
                </p></div>
		  </BaseLayout>		  
		);
	}
}