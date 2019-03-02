import React from 'react';
import {Button} from 'reactstrap';

export default class Timer extends React.Component{

    constructor(props)
    {
      super(props);
      this.state={
        clock:0,
        minute:0,
        hour:0,
        portrait:true,
        landscape:false
      };
      this.myfunc=this.myfunc.bind(this);
    }

        componentDidMount(){
            this.timer=setInterval(this.myfunc,1000);
        }
        myfunc()
        {
        if(this.state.clock<59)
        {
        this.setState({clock:this.state.clock+1});
        }
        else{
            //console.log("hi");
            if(this.state.minute<59)
            this.setState({minute:this.state.minute+1,clock:0})
            else {
            this.setState({hour:this.state.hour+1,minute:0,clock:0})
            }
        }
        }
    render(){
        return(
            <div>
                <Button color="warning" style={{color:'#5d4037',fontSize:20,fontWeight:'bold',paddingLeft:20,paddingRight:20}}>{this.state.hour}:{this.state.minute}:{this.state.clock}</Button>
            </div>
        );
    }
}