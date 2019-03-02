import React from 'react'
import {
    UncontrolledCarousel,
    Container,
    Row,
    Col
  } from 'reactstrap';
import Notice from './notices';

  const items = [
    {
      src:'/static/images/jeemain.jpg'
    },
    {
      src: '/static/images/wbjee.jpg'
    },
    {
      src: '/static/images/jeemain1.jpg'
    },
    {
        src: '/static/images/wbjee1.jpg'
      }
  ];
export default class Home extends React.Component{
    render()
    {
        const {isAuthenticated,notice}=this.props;
        return(
            <div>
            <Container>
                <Row>
                    <Col md="3" style={{paddingTop:200}}>
                    {isAuthenticated &&
                    <div className="style-card">
                    {
                      notice.map((item,index)=>{
                        return <Notice title={index} key={index} text={item.data.noticeText} docs={item.data.noticeImage} date={item.data.date}/>
                      })
                    }
                    </div>}
                    </Col>
                    <Col md="9" style={{paddingTop:100}}>
                        <UncontrolledCarousel items={items}/>
                    </Col>
                </Row>
            </Container>
            <div className="welcome-style">
                <h2 style={{color:'#ce93d8'}}>Welcome Students</h2>
                <p style={{color:'white',fontSize:20}}>The world of mathematics opens up a world that you never 
                imagined when you take advantage of the possibilities it opens to you, 
                whether it be seeing the beauty in things or opening up more lifelong opportunities.
                Hi,I am Rajarshi Roy. 
                I have been teaching Mathematics since 1995.
                For all the Batch details please browse through my website.
                For all your queries please contact me. My contact details 
                are provided in this website.</p>
            </div>
            </div>
        );
    }
}