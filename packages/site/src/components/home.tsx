import React from 'react';

import AppHero from './hero';
import AppAbout from './about';
import AppFaq from './faq';

function AppHome() {
  return (
    <div className="main">
      <AppHero/>
      <AppAbout/>
      <AppFaq/>
      {/* <AppContact/> */}
    </div>
  );
}

export default AppHome;