import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { BrowserRouter, Route, Link } from "react-router-dom";
import { Anchor, Drawer, Button } from 'antd';
const { Link } = Anchor;
import {
  MenuFoldOutlined, HomeOutlined
} from '@ant-design/icons';

function AppHeader() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    // <div className='navbar'>
    <div style={{ backgroundColor: "#fbedda", padding: "0 10vw", border: "1px solid black" }}>
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="/#hero" >Metamask Snap</a>
        </div>

        <div className="mobileHidden">
          <Anchor >
            <Link href="/#hero" title="Home" />
            <Link href="/#about" title="About" />
            <Link href="/insights" title="Insights" />
            <Link href="/#faq" title="FAQ" />
          </Anchor>
        </div>

        <div className="mobileVisible">
          <button onClick={showDrawer} className="bttn">
            <MenuFoldOutlined/>
          </button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Link href="/#hero" title="Home" />
            <Link href="/#about" title="About" />

            <Link href="/#faq" title="FAQ" />
            <Link href="/insights" title="Insights" />
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;


