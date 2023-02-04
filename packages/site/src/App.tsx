import { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
// import { Footer, Header } from './components';

import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';
import './components/css/App.css';
import { Breadcrumb, Button } from 'antd';
import { Layout, Menu, theme } from 'antd';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import AppHome from './components/home';
import { Content, Footer } from 'antd/es/layout/layout';

const { Header } = Layout;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;
export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);

  return (
    <Layout className="mainLayout">
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <AppHome/>
      </Content>
      <Footer>
        <AppFooter/>  
      </Footer>
    </Layout>
    // <>
    //   {/* <GlobalStyle /> */}
    //   {/* <Wrapper> */}
    //     {/* <Header handleToggleClick={toggleTheme} /> */}
    //     {/* {children} */}
    //     {/* <Footer /> */}
    //   {/* </Wrapper> */}
    // </>
  );
};
