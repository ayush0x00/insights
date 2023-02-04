import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { BrowserRouter, Route, Link } from "react-router-dom";
import { Anchor, Drawer, Button } from 'antd';
const { Link } = Anchor;

function AppHeader() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="/" >Metamask Snap</a>
        </div>
        <div className="mobileHidden">
          <Anchor >
            <Link href="#heronpm i --save @fortawesome/fontawesome-svg-core
" title="Home" />
            <Link href="#about" title="About" />
            {/* <Link href="#feature" title="Features" /> */}
            <Link href="#faq" title="FAQ" />
            {/* <Link href="#contact" title="Contact" /> */}
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars">Menu</i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            {/* <Anchor > */}
              <Link href="#hero" title="Home" />
              <Link href="#about" title="About" />

              {/* <Link href="#feature" title="Features" /> */}
              <Link href="#faq" title="FAQ" />
              <Link href="./insights" title="Insights"/>
              {/* <Link href="#contact" title="Contact" /> */}
            {/* </Anchor> */}
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;


