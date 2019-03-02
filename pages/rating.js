import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import { Progress } from 'reactstrap'
import StarRatingComponent from 'react-star-rating-component'
import Cookies from 'js-cookie';
import { fire } from '../firebase/firebase';
import { toast } from 'react-toastify';
import User from '../components/user';
export default class Rating extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      isloading:true,
      wbjeerating:0,
      jeemainrating:0,
      wbjeepercentage:0,
      jeemainpercentage:0,
      error:"Calculating score wait a while....."
    }
  }
 async componentWillMount(){
    let wbjee=Cookies.get('userscorewbjee')
    let outofwbjee=Cookies.get('Outofwbjee')
    let jeemain=Cookies.get('userscorejeemain')
    let outofjeemain=Cookies.get('Outofjeemain')
    let user=Cookies.get('user')
    var ratingwb=0
    var percentageWb=0
    var ratingje=0
    var percentageje=0
    if(wbjee==undefined && outofwbjee==undefined && jeemain == undefined && outofjeemain==undefined)
    {
      this.setState({error:"You haven't give any examination...."})
    }
    if(wbjee!=undefined && outofwbjee!=undefined)
    {
      wbjee=parseFloat(wbjee)
      outofwbjee=parseInt(outofwbjee)
      ratingwb=(wbjee/outofwbjee)*5;
      percentageWb=(wbjee/outofwbjee)*100;
      ratingwb=ratingwb.toFixed(2)
      percentageWb=percentageWb.toFixed(2)
      this.setState({wbjeerating:ratingwb})
      this.setState({wbjeepercentage:percentageWb})
    }
    if(jeemain!=undefined && outofjeemain!=undefined)
    {
      jeemain=parseFloat(jeemain)
      outofjeemain=parseInt(outofjeemain)
      ratingje=(jeemain/outofjeemain)*5;
      percentageje=(jeemain/outofjeemain)*100;
      ratingje=ratingje.toFixed(2)
      percentageje=percentageje.toFixed(2)
      this.setState({jeemainrating:ratingje})
      this.setState({jeemainpercentage:percentageje})
    }
    if(ratingwb!=0 && percentageWb!=0)
    {
      await fire.database().ref(`/users/${user}`).update({
        wbrating:ratingwb,
        wbpercentage:percentageWb
      }).then((res)=>{
        console.log("success scoring wbjee")
      }).catch((err)=>{
        toast.error(err.message);
      })
    }
    if(ratingje!=0 && percentageje!=0)
    {
      await fire.database().ref(`/users/${user}`).update({
        jerating:ratingje,
        jepercentage:percentageje
      }).then((res)=>{
        console.log("succes updation jeemain")
      }).catch((err)=>{
        toast.error(err.message)
      })
    }
    if(wbjee!=undefined && outofwbjee!=undefined)
    {
      Cookies.remove('userscorewbjee')
      Cookies.remove('Outofwbjee')
      this.setState({isloading:false})
    }
    if(jeemain!=undefined && outofjeemain!=undefined)
    {
      Cookies.remove('userscorejeemain')
      Cookies.remove('Outofjeemain')
      this.setState({isloading:false})
    }
    
  }
    render()
    {
      const {isAuthenticated}=this.props.auth;
      const {isloading}=this.state;
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
                  <p className="loading-title">{this.state.error}</p>
              </div>
        </BaseLayout>	
        );
      }
        return(
            <BaseLayout {...this.props.auth}
            title="Exam Arena">
                <div className="rating-pad">
                <div className="timeline">
                <div className="container2 left">
                  <div className="content">
                    <h2>Wbjee Result</h2>
                    <hr/>
                    <h3 style={{color:'#ffc400'}}>Wbjee Rating : <span style={{color:"#212121"}}>{this.state.wbjeerating}</span></h3>
                    <StarRatingComponent 
                    name="wbjee"
                    starCount={5}
                    value={this.state.wbjeerating}
                    />
                    <hr/>
                    <h3 style={{color:'#6a1b9a'}}>Wbjee Percent : <span style={{color:"#212121"}}>{this.state.wbjeepercentage}%</span></h3>
                    <Progress striped={true} color="warning" value={this.state.wbjeepercentage}/>
                    <hr/>
                    <p>Its your time to discover your power of thinking through this online test.Take test and get marks instantly.There will be a great pleasure to see you in examination rating page</p>
                  </div>
                </div>
                <div className="container2 right">
                  <div className="content">
                    <h2>JeeMain Result</h2>
                    <hr/>
                    <h3 style={{color:'#ffc400'}}>JeeMain Rating:  <span style={{color:"#212121"}}>{this.state.jeemainrating}</span></h3>
                    <StarRatingComponent 
                    name="jeemain"
                    starCount={5}
                    value={this.state.jeemainrating}
                    />
                    <hr/>
                    <h3 style={{color:'#6a1b9a'}}>JeeMain Percent : <span style={{color:"#212121"}}>{this.state.jeemainpercentage}%</span></h3>
                    <Progress striped={true} color="warning" value={this.state.jeemainpercentage}/>
                    <hr/>
                    <p>Its your time to discover your power of thinking through this online test.Take test and get marks instantly.There will be a great pleasure to see you in examination rating page</p>
                  </div>
                </div>
              </div>
                </div>
            </BaseLayout>
        );
    }
}