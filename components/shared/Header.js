import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  DropdownItem,
DropdownToggle,
DropdownMenu,
Dropdown
} from 'reactstrap';
 import {Link} from '../../routes';
 import auth0 from '../../services/auth0';
 const Login=()=>{
   return (
     <span className="nav-link port-navbar-link clickable">Login</span>
   );
 }
 const Logout=()=>{
   return(
     <span onClick={auth0.logout} className="nav-link port-navbar-link clickable">Logout</span>
   );
 }

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggle1=this.toggle1.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen:false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggle1() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  renderUploadMenu(){
    const { isSiteOwner }=this.props;
    if( isSiteOwner){
      return(
        <Dropdown className="port-navbar-link port-dropdown-menu" isOpen={this.state.dropdownOpen} toggle={this.toggle1}>
          <DropdownToggle className="port-dropdown-toggle" nav caret >
            Uploads
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link route="/questionUpload"><a className="port-dropdown-item">Question Upload</a></Link></DropdownItem>
            <DropdownItem ><Link route="/questionDashBoard"><a className="port-dropdown-item">All questions</a></Link></DropdownItem>
            <DropdownItem ><Link route="/noticeUpload"><a className="port-dropdown-item">Notice Upload</a></Link></DropdownItem>
            <DropdownItem ><Link route="/idProvide"><a className="port-dropdown-item">Id Providation</a></Link></DropdownItem>            
            <DropdownItem ><Link route="/permission"><a className="port-dropdown-item">Permission</a></Link></DropdownItem>                        
            </DropdownMenu>
        </Dropdown>
      )
    }    
  }
  render() {
    const {isAuthenticated,className}=this.props;
    const {isOpen}=this.state;
    const menuOpenClass=isOpen?'menu-open':'menu-close';
    return (
      <div>
        <Navbar color="light" dark expand="md" className={`${className} port-navbar port-nav-base absolute ${menuOpenClass}`} color="transparent">
          <NavbarBrand href="/" className="port-navbar-brand">
          <img src="static/images/ExamArena.png" className="header-img"></img>
          Exam Arena
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
			  <NavItem className="port-navbar-item">
			  <Link href='/'>
			  <a className="nav-link port-navbar-link">Home</a>
			  </Link>
        </NavItem>
        {this.renderUploadMenu()}
        {
          !isAuthenticated &&
          <NavItem className="port-navbar-item" >
            <Link href='/login'>
              <a className="nav-link port-navbar-link clickable">Login</a>            
              </Link>
                </NavItem>
        }
        {
          isAuthenticated &&
          <NavItem className="port-navbar-item" >
            <Link href='/profile'>
			        <a className="nav-link port-navbar-link">Profile</a>
              </Link>
          </NavItem>
        }
        {
          isAuthenticated &&
          <NavItem className="port-navbar-item" >
            <Link href='/wbjeeexam'>
			        <a className="nav-link port-navbar-link">Wbjee</a>
              </Link>
          </NavItem>
        }
        {
          isAuthenticated &&
          <NavItem className="port-navbar-item" >
            <Link href='/jeemain'>
			        <a className="nav-link port-navbar-link">Jeemain</a>
              </Link>
          </NavItem>
        }
        {
          isAuthenticated &&
          <NavItem className="port-navbar-item" >
            <Link href='/login'>
              <Logout/>
              </Link>
          </NavItem>
        }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

