import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import Home from '../components/layout/home';
import { fire } from '../firebase/firebase';
export default class Index extends React.Component{
	constructor(props){
		super(props)
		this.state={
			signup:false,
			notice:{},
			loading:true
		}
		this.onSignUpToggle=this.onSignUpToggle.bind(this);
	}
	onSignUpToggle(){
		this.setState({signup:!this.state.signup});
	}
	componentWillMount(){
		fire.database().ref('/noticeboard').once('value')
		.then(snap=>{
			this.setState({notice:snap.val()})
			this.setState({loading:false})
		}).catch((err)=>{
			console.log(err.message)
		})
	}
	render()
	{
		const {isAuthenticated}=this.props.auth;
		const {loading,notice}=this.state;
		return(
			<BaseLayout {...this.props.auth}
			title="Exam Arena Home Page">
				<div className="home-style">
				{!loading? <Home isAuthenticated={isAuthenticated} notice={notice}/>: <h2 
				style={{paddingTop:150,marginLeft:40,color:'white',fontSize:40}}>Wait a while....</h2>}
				</div>
		  </BaseLayout>		  
		);
	}
}