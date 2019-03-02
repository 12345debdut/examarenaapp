import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';
export default class BaseLayout extends React.Component{
	render()
	{
		const {className,children,isAuthenticated,isSiteOwner,title,cannonical}=this.props;
		const {user}=this.props;
		const headerType=this.props.headerType || 'default';
		return(
			<React.Fragment>
			<Head>
			<title>{title}</title>
			<meta name="description" content="The website is totally dedicated for giving test for giving mocktest for Wbjee,Jeemain,JeeAdvanced,Jeca"></meta>
			<meta name="keywords" content="Rajarshiroy's Maths Classes"></meta>
			<meta property="og:title" content="Exam Arena, examination center,Rajarshi Roy"/>
			<meta property="og:locale" content="hi_in"/>
			<meta property="og:url" content={`${process.env.BASE_URL}`}/>
			<meta property="og:description" content="The website is totally dedicated for giving test for giving mocktest for Wbjee,Jeemain,JeeAdvanced,Jeca"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
			{cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}/${cannonical}`}></link>}
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"></link>
			<link rel="icon" type="image/ico" href="/static/images/favicon (2).ico"></link>
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
			<meta name="theme-color" content="#27444e"></meta>
			<meta name="msapplication-navbutton-color" content="#27444e"></meta>
			<meta name="apple-mobile-web-app-status-bar-style" content="#27444e"></meta>
			</Head>
			<div>
			<Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} user={user} isSiteOwner={isSiteOwner}/>				
			<main className={`cover ${className}`}>
					<div className="wrapper">
						{children}
					</div>
				</main>
			</div>
			</React.Fragment>
		)
	}
}