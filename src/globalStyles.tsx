import 'antd/dist/antd.css'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
.text {
  color: rgba(0, 0, 0, 0.65);
}
.selected {
  background-color: antiquewhite;
}
.hide_toolbar .mde-header {
  display: none;
}
.no_border {
  border: none;
}

section.section {
  margin-bottom: '24px';
  counter-increment: 'a';
}
.react-mde {
  .mde-header{
    .mde-tabs{
      margin-left: 75px
    }
  }
}
`
export default GlobalStyle
