import React from 'react';

import { BackTop } from 'antd';

function AppFooter() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="">Tech Meet'23</a>
        </div>
        <ul className="socials">
          <li><a href="https://github.com/ayush0x00/insights"><i className="fa-brands fa-github"></i></a></li>
         
        </ul>
        <div className="copyright">Copyright &copy; Primary ID 25</div>
        <BackTop>
          <div className="goTop"><i className="fas fa-arrow-circle-up"></i></div>
        </BackTop>
      </div>
    </div>
  );
}

export default AppFooter;


