import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../../assets/css/intro.css';

class Intro extends Component {
  render() {
    return (
      <div className='main-div'>
        <h1 style={{fontWeight: 700 , fontSize:'4rem'}}>ConvoSync </h1>
        <p style={{color:'#385A64' , fontFamily:'sans-serif' , wordWrap: 'break-word' , lineHeight: '1.6'}}>
         <strong> Organise meets, chat with your friends ,<br />
          make calls and collaborate in just one place.</strong>
        </p>
        
        {this.props.isAuthenticated ? (
          <Link to="/dashboard">
            <Button className='btn' color='danger'>
              Open ConvoSync
            </Button>
          </Link>
        ) : (
          <>
            {' '}
            <Link to='/login'>
              <Button className='btn' color='danger'>
                Sign In
              </Button>
            </Link>
            <Link to='/register'>
              <Button className='btn' outline color='danger'>
                Sign Up
              </Button>
            </Link>{' '}
          </>
        )}
      </div>
    );
  }
}

export default Intro;
