
import { RouterProvider } from 'react-router-dom'
import Router from './Router'

import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
  box-sizing: border-box;
  }
  body {
    background-color: black;
    color: #eeeeee;
    font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

`;

function App() {
  return<>
    <GlobalStyles/>
    <RouterProvider router={Router} />
  </>

}

export default App
