import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import User from '../components/user';
import IdProvidation from '../components/form/idProvide';
export default class IdProvide extends React.Component{
	constructor(props){
		super(props)
		this.state={
			signup:false,
			showwbjee:true,
			showjeemain:false,
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
			title="Exam Arena admin-id-providation" className="cover1">
			<div className="base-card">
            </div>
            <div className="id-provide-container">
            <IdProvidation/>
            </div>
		  </BaseLayout>		  
		);
	}
}