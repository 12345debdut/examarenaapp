import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import {Card,CardBody,CardFooter,CardText,CardHeader,Button,Container,Row,Col} from 'reactstrap';
import User from '../components/user';
import {getWbjeeQuestion} from '../actions/index';
import {toast} from 'react-toastify'
import { fire } from '../firebase/firebase';
import Timer from '../components/timer';
import * as Cookies from 'js-cookie';
import Router from 'next/router'
export default class JeeMain extends React.Component{
	constructor(props){
		super(props)
		this.state={
            signup:false,
            user:{},
            isloading:true,
            button:[],
            index:0,
            question:[],
            answer:[],
            abool:false,
            bbool:false,
            cbool:false,
            dbool:false,
            correct:'',
            correctarray:[],
            loadingtext:'Wait a while.....'
        }
        this.onChange=this.onChange.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onFinalSubmit=this.onFinalSubmit.bind(this);
    }
    onChange(i)
    {
        const {question}=this.state;
        if(i==-1)
        {
            toast.warn("You have reached at the begining");
        }
        else if(i==question.length)
        {
            toast.warn("You have reached the end of your question series")
        }
        else
        this.setState({index:i})
    }
    timerset(){
        setTimeout(this.onFinalSubmit,3600000);        
    }
    async componentWillMount(){
        const {button}=this.state;
        var count=51;
        let question=[];
        var permission=await fire.database().ref('/permissionjeemain').once('value').then((snap)=>{
            var val=snap.val();
            return val.permission;
        }).catch((err)=>{
            toast.error(err.message)
        })
        if(permission)
        {
        question=await fire.database().ref('/questionsjeemain').once('value')
        .then((snap)=>{return (snap.val())})
        .catch((err)=>{console.log(err)})
        this.setState({question})
        for(let i=0;i<question.length;i++)
        {
            if(i>-1 && i<9)
            {
                if(i%5==0)
                {
                    button.push(<br key={count}/>)
                    button.push(<Button key={i+1} onClick={()=>{this.onChange(i)}} className="jump-button">{0}{i+1}</Button>)
                }
                else{
                    button.push(<Button key={i+1} onClick={()=>{this.onChange(i)}} className="jump-button">{0}{i+1}</Button>)
                }
            }
            else
            {
                if(i%5==0)
                {
                    button.push(<br key={count}/>)
                    button.push(<Button key={i+1} onClick={()=>{this.onChange(i)}} className="jump-button">{i+1}</Button>)
                }
                else
                button.push(<Button key={i+1} onClick={()=>{this.onChange(i)}} className="jump-button">{i+1}</Button>) 
            }
            count+=1;
        }
        this.setState({isloading:false})
    }else{
        this.setState({loadingtext:"you have no permission to enter into test"})
    }
    }

    handleChange(e){
        var name=e.target.name
        if(name==='a')
        {
            this.setState({abool:true})
            this.setState({bbool:false})
            this.setState({cbool:false})
            this.setState({dbool:false})
        }
        else if(name==='b')
        {
            this.setState({bbool:true})
            this.setState({abool:false})
            this.setState({cbool:false})
            this.setState({dbool:false})
        }
        else if(name==='c')
        {
            this.setState({cbool:true})
            this.setState({bbool:false})
            this.setState({abool:false})
            this.setState({dbool:false})
        }
        else if(name==='d')
        {
            this.setState({dbool:true})
            this.setState({bbool:false})
            this.setState({cbool:false})
            this.setState({abool:false})
        }
        this.setState({correct:name})
    }

    onSubmit(){
        const {abool,bbool,cbool,dbool}=this.state;
        if(abool || bbool || cbool || dbool)
        {
            this.state.correctarray[this.state.index]=this.state.correct;
        }else{
            this.state.correctarray[this.state.index]=null;
        }
        this.setState({dbool:false})
        this.setState({bbool:false})
        this.setState({cbool:false})
        this.setState({abool:false})
        console.log(this.state.correctarray);
    }

    onFinalSubmit(){
        const {question,correctarray}=this.state;
        var value=0;
        for(var i=0;i<question.length;i++)
        {
            if(question[i].correct===correctarray[i])
            {
                value=value+4;
            }
            else if(correctarray[i]==undefined || correctarray[i]==null)
            {
                value=value+0
            }
            else{
                value=value-1;
            }
        }
        var outof=question.length*4;
        Cookies.set('userscorejeemain',value,isSecureContext);
        Cookies.set('Outofjeemain',outof);
        toast.success("Your score is submitted")
        Router.push('/rating')
    }

	render()
	{
        const {isAuthenticated}=this.props.auth;
        const {isloading,question,index}=this.state;
        const {button}=this.state;
        const {correctarray}=this.state;
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
                        <p className="loading-title">{this.state.loadingtext}</p>
                    </div>
              </BaseLayout>	
            );
        }
		return(
			<BaseLayout {...this.props.auth}
            title="Exam Arena Jeemain Examination">
            {this.timerset()}
                {!isloading && <div style={{paddingTop:150,display:'flex',justifyContent:'space-between',alignSelf:'center'}}>
                    <div style={{marginLeft:20}}>
                        <Timer/>
                    </div>
                    <Button color="success" style={{marginRight:20}} onClick={()=>{this.onFinalSubmit()}}>Final Submission</Button>
                </div>}
                <Container>
                    <Row>
                        <Col md="8">
                        <div className="div-pad">
                        <div className="wbjee-div">
                            <Card className="wbjee-card">
                                <CardHeader className="wbjee-title">
                                    JeeMain Examination
                                </CardHeader>
                                <CardBody className="wbjee-body">
                                {question[index].questionText && <CardText>
                                    <pre className="breakword">
                                {question[index].questionText}</pre>
                                </CardText>}
                                {question[index].questionimage && <CardText>
                                <img src={question[index].questionimage} alt="question"/>
                                </CardText>}
                                </CardBody>
                                <CardFooter className="wbjee-footer">
                                    <CardText>
                                        please select a one correct option
                                    </CardText>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="wbjee-option-div">
                            <Card className="wbjee-option">
                                <CardBody className="wbjee-option-body">
                                <label className="container1 wbjee-option-text">Option a
                                <input type="checkbox" checked={this.state.abool} className="input1" name="a" onChange={(e)=>{this.handleChange(e)}}/>
                                <span className="checkmark"></span>
                              </label>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="wbjee-option-div">
                        <Card className="wbjee-option">
                            <CardBody>
                            <label className="container1 wbjee-option-text">Option b
                            <input type="checkbox" className="input1" checked={this.state.bbool} name="b" onChange={(e)=>{this.handleChange(e)}}/>
                            <span className="checkmark"></span>
                          </label>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="wbjee-option-div">
                    <Card className="wbjee-option">
                        <CardBody>
                        <label className="container1 wbjee-option-text">Option c
                        <input type="checkbox" className="input1" name="c" checked={this.state.cbool} onChange={(e)=>{this.handleChange(e)}}/>
                        <span className="checkmark"></span>
                      </label>
                        </CardBody>
                    </Card>
                </div>
                <div className="wbjee-option-div">
                <Card className="wbjee-option">
                    <CardBody>
                    <label className="container1 wbjee-option-text">Option d
                    <input type="checkbox" className="input1" name="d" checked={this.state.dbool} onChange={(e)=>{this.handleChange(e)}}/>
                    <span className="checkmark"></span>
                  </label>
                    </CardBody>
                </Card>
            </div>
            <div>
                <p className="correct-text">{correctarray[index]}</p>
            </div>
                <div className="Wbjee-button">
                    <Button className="button-prev" onClick={()=>{this.onChange(this.state.index-1)}}>Prev</Button>
                    <Button className="button-next" onClick={()=>{this.onChange(this.state.index+1)}}>Next</Button>
                    <Button className="button-next" onClick={()=>{this.onSubmit()}}>Submit</Button>
                </div>
                    </div>
                        </Col>
                        <Col md="4">
                        <div className="div-pad">
                            <div className="wbjee-jump-box">
                                <div className="jump-buttons">
                                {button}
                                </div>
                            </div>
                        </div>
                    </Col>
                    </Row>
                </Container>
		  </BaseLayout>		  
		);
	}
}