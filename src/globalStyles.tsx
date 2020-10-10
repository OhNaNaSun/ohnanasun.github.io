import 'antd/dist/antd.css'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px 28px 16px 0;
  float: left;
}

.site-layout-background {
  background: #fff;
}

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
body {
  margin: 0;
  font: 16px/20px BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 20px;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
h2 {
  font-size: 20px;
}
h3 {
  font-size: 16px;
}

address,
blockquote,
body,
dd,
dl,
fieldset,
figcaption,
figure,
form,
h1,
h2,
h3,
h4,
h5,
h6,
legend,
ol,
p,
pre,
td,
th,
ul {
  margin: 0;@import '~antd/dist/antd.css';
@import '~react-mde/lib/styles/css/react-mde-all.css';
  padding: 0;
}

a {
  color: #0059b2;
}
a:visited {
  color: #551a8b;
}
section.section {
  margin-bottom: '24px';
  counter-increment: 'a';
}

ul.list {
  padding: 0;
  margin: 0;
  counter-reset: b;
  margin-bottom: 24px;
  list-style-type: none;
  -webkit-column-gap: 10px;
  column-gap: 10px;
  -webkit-columns: 3;
  columns: 3;

  li.list_item {
    counter-increment: b;
    margin-bottom: 2px;
    div {
      position: relative;
      padding-left: 38px;
      margin-bottom: 2px;
      &:before {
        position: absolute;
        top: 4px;
        left: 0;
        font-family: Consolas, Lucida Console, Menlo, Monaco, monospace;
        font-size: 12px;
        line-height: 16px;
        content: counter(a) '.' counter(b);
      }
    }
  }
}
`
export default GlobalStyle