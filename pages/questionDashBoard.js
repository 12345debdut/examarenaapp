import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import User from '../components/user';
import { fire } from '../firebase/firebase';
import swal from 'sweetalert';
import DetailCard from '../components/layout/detailcard';
import {Button} from 'reactstrap';
export default class QusetionDashBoard extends React.Component{
	constructor(props){
		super(props)
		this.state={
			signup:false,
			wbjee:[],
			jeemain:[],
			loading:true,
			showwbjee:true,
			showjeemain:false
		}
		this.onSignUpToggle=this.onSignUpToggle.bind(this);
	}
	onSignUpToggle(){
		this.setState({signup:!this.state.signup});
	}
	async componentWillMount(){
		await fire.database().ref('/questionswbjee').once('value')
		.then((snap)=>{
			this.setState({wbjee:snap.val()})
		}).catch((err)=>{
			swal({
				title:'Error',
				text:`${err.message}`,
				button:'Cancel!!',
				icon:'error'
			})
		})
		await fire.database().ref('/questionsjeemain').once('value')
		.then((snap)=>{
			this.setState({jeemain:snap.val()})
		}).catch((err)=>{
			swal({
				title:'Error',
				text:`${err.message}`,
				button:'Cancel!!',
				icon:'error'
			})
		})
		this.setState({loading:false})
	}
	
	render()
	{
		const {isSiteOwner}=this.props.auth;
		const {loading}=this.state;
		const {wbjee,jeemain,showjeemain,showwbjee}=this.state;
        if(!isSiteOwner)
        {
            return(
                <User auth={this.props.auth}/>
            );
		}
        if(loading)
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
			title="Exam Arena admin-allquestions">
			<div className="base-card">
			<div className="wbjee-jeemain">
				<div className={showwbjee?"active1":"inactive1"} onClick={()=>{this.setState({showwbjee:!showwbjee})}}>
				<p>Wbjee Questions</p>
				</div>
				<div className={showjeemain?"active1":"inactive1"} onClick={()=>{this.setState({showjeemain:!showjeemain})}}>
				<p>Jeemain Questions</p>
				</div>
			</div>
			{
				showwbjee && wbjee &&
				wbjee.map((item,index)=>{
					return (
					<div className="cards-style">
						<DetailCard key={index} index={index} questionText={item.questionText} questionImage={item.questionimage} Correct={item.correct}/>
					</div>
					);
				})
			}
			{
				showjeemain && jeemain &&
				jeemain.map((item,index)=>{
					return (
					<div className="cards-style">
						<DetailCard key={index} index={index} questionText={item.questionText} questionImage={item.questionimage} Correct={item.correct}/>
					</div>
					);
				})
			}
			</div>
		  </BaseLayout>		  
		);
	}
}