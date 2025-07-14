import React from 'react';

const footerStyle = {
  // 
  backgroundColor: '#264653',
  color: 'white',
  textAlign:' center',
  padding: '1rem 0',
  fontSize: '0.9rem',
  marginTop: '3rem',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 1.5rem',
  flexWrap: 'wrap',
};

const leftStyle = {
  textAlign: 'left',
  minWidth: 220,
  lineHeight: 1.7,
};

const rightStyle = {
  textAlign: 'right',
  minWidth: 220,
  lineHeight: 1.7,
};

function Footer() {
  return (
    <footer style={footerStyle} >
      <div style={containerStyle} >
        <div style={leftStyle}>
          <div ><strong>Welcome to ConvoSync !!!</strong></div>
          {/* <div>
            <b>Made with </b><span style={{ color: '#dc3545', fontWeight: 600 }}>&hearts;</span> by <b></b>
          </div> */}
          <div>
            <span>Delhi, India</span>
          </div>
          <div>
            <a href="mailto:noreplyconvosync@gmail.com" style={{ textDecoration: 'underline',color:'white'}}>
              noreplyconvosync@gmail.com
            </a>
          </div>
        </div>
        <div style={rightStyle}>
          <b>About ConvoSync</b>
          <div style={{ fontWeight: 400 }}>
            Effortless chat and video calls.<br />
            Find anyone, connect instantly, and collaborate in real time.<br />
            All your conversations, one powerful platform.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;