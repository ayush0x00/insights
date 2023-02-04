import React from 'react';

import AppHero from './hero';
import AppAbout from './about';
import AppFeature from './feature';
import AppFaq from './faq';
import AppContact from './contact';

function AppHome() {
  return (
    <div className="main">
      <AppHero/>
      <AppAbout/>
      {/* <AppFeature/> */}
      <AppFaq/>
      {/* <AppContact/> */}
    </div>
  );
}

export default AppHome;