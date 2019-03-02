import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import User from '../components/user';
import {Container,Row,Col} from 'reactstrap';
import PermissionWbjee from '../components/form/permission';
import PermissionJeemain from '../components/form/permissionje';
export default class Permission extends React.Component{
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
		const {showwbjee,showjeemain}=this.state;
        const {isSiteOwner}=this.props.auth;
        if(!isSiteOwner)
        {
            return(
                <User auth={this.props.auth}/>
            );
        }
		return(
			<BaseLayout {...this.props.auth}
			title="Exam Arena admin-questionupload">
			<Container className="permission-container">
			<Row className="question-row">
			<Col md="6">
			<div className="base-card">
			<div className="wbjee-jeemain">
				<div className={showwbjee?"active1":"inactive1"} onClick={()=>{this.setState({showwbjee:!showwbjee})}}>
				<p>Wbjee Permission</p>
				</div>
				<div className={showjeemain?"active1":"inactive1"} onClick={()=>{this.setState({showjeemain:!showjeemain})}}>
				<p>Jeemain Permission</p>
				</div>
			</div>
			</div>
				{showwbjee && <div className="wbjee-form">
					<PermissionWbjee/>
				</div>}
				{showjeemain && <div className="jeemain-form">
					<PermissionJeemain/>
				</div>}
				</Col>
				</Row>
				</Container>
		  </BaseLayout>		  
		);
	}
}