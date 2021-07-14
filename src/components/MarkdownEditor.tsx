import React, { useState, useEffect } from 'react'

// https://codepen.io/KrissSteindals/pen/yrBdQe?editors=0110
import * as Showdown from 'showdown'
import styled from 'styled-components'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const $bg = '#424242'
const $titlebarBg = '#212121'
const $text = '#bdbdbd'
const StyledContainer = styled.div`
  * {
    box-sizing: border-box;
  }

  // html {
  //   font-size: 62.5%;
  // }

  // body {
  //   font-family: 'Open Sans', sans-serif;
  //   font-size: 1.6rem;
  //   background-color: #cecece;
  //   padding: 1.5rem;
  //   color: #fafafa;
  //   background-color: #616161;
  // }

  a,
  a:visited {
    color: #64b5f6;
  }

  a:hover {
    color: #2196f3;
  }

  img {
    max-width: 100%;
  }

  pre {
    white-space: pre-wrap;
    background-color: #616161;
    padding: 2rem;
    line-height: 2rem;
    border-radius: 0.5rem;
  }

  code {
    background-color: #616161;
    padding: 0.2rem 0.5rem;
  }

  hr {
    border: none;
    height: 1px;
    background-color: #616161;
  }

  table {
    border-collapse: collapse;
  }

  table,
  th,
  td {
    padding: 0.5rem;
    border: 2px solid#9E9E9E;
  }

  .container {
    max-width: 2000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.75);
    border: 1px solid #616161;
    border-radius: 5px;
    overflow: hidden;
  }

  .window {
    min-width: 360px;
    min-height: 95vh;
    background-color: #fff;
    flex-grow: 1;
    flex-basis: 0;
    overflow: hidden;
  }

  .titlebar {
    padding: 1rem 2rem;
    padding-right: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${$titlebarBg};
    color: #616161;
    text-transform: uppercase;
    h3 {
      margin: 0;
      font-size: 1.1rem;
    }

    button {
      display: block;
      padding: 0;
      width: 12px;
      height: 12px;
      font-size: 0.8rem;
      border-radius: 50%;
      background-color: #616161;
      color: #616161;
      border: none;
      outline: none;
      cursor: pointer;
      &:hover {
        background-color: #95c623;
        color: #424242;
      }
    }
  }

  .editor-wrapper {
    height: 100%;
  }

  #editor {
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
    outline: none;
    border: none;
    border-radius: 0;
    resize: vertical;
    font-size: 1.1rem;
    line-height: 1.2rem;
    color: #fafafa;
    background-color: ${$bg};
  }

  #preview {
    padding: 1rem 2rem;
    padding-bottom: 3rem;
    background-color: ${$bg};
    height: 100%;
  }
`
interface MdEditorProps {
  mdContent?: string
  returnMdContent: (arg0: string) => void
}
const MarkdownEditor: React.FC<MdEditorProps> = ({ mdContent, returnMdContent }) => {
  const [text, setText] = useState(mdContent || '')
  const [editorMaximized, setEditorMaximized] = useState(false)
  const [previewerMaximized, setPreviewerMaximized] = useState(false)
  const onChange = (e: { target: { value: any } }): void => {
    const { value } = e.target
    setText(value)
  }
  useEffect(() => {
    returnMdContent(text)
  }, [returnMdContent, text])
  const handleMaximize = (val: { target: { name: any } }): void => {
    const { name } = val.target
    // const value = this.state[name]
    // this.setState({ [name]: !value })
    // setEditorMaximized(!value)
  }

  return (
    <StyledContainer>
      <div className="container">
        <Editor
          text={text}
          update={onChange}
          maximize={editorMaximized}
          handleMaximize={handleMaximize}
          visible={previewerMaximized}
        />
        <Previewer
          text={text}
          maximize={previewerMaximized}
          handleMaximize={handleMaximize}
          visible={editorMaximized}
        />
      </div>
    </StyledContainer>
  )
}

function Titlebar(props: { titleName: any; fullscreen: any; name: any }) {
  const { titleName, fullscreen, name } = props

  return (
    <div className="titlebar">
      <h3>{titleName}</h3>
      <div className="rounded">
        <button type="button" onClick={fullscreen} name={name} />
      </div>
    </div>
  )
}

function Editor(props: { text: any; update: any; handleMaximize: any; visible: any; maximize: any }) {
  const { text, update, handleMaximize, visible } = props

  if (visible) {
    return null
  }
  return (
    <div className="window">
      <Titlebar titleName="Editor" fullscreen={handleMaximize} name="editorMaximized" />
      <div className="editor-wrapper">
        <textarea name="textarea" id="editor" value={text} onChange={update} />
      </div>
    </div>
  )
}

function Previewer(props: { text: any; handleMaximize: any; visible: any; maximize: any }) {
  const { text, handleMaximize, visible } = props
  if (visible) {
    return null
  }

  return (
    <div className="window">
      <Titlebar titleName="Previewer" fullscreen={handleMaximize} name="previewerMaximized" />
      <div id="preview" dangerouslySetInnerHTML={{ __html: converter.makeHtml(text) }} />
    </div>
  )
}

export default MarkdownEditor
