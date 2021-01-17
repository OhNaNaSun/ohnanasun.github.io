import React from 'react'
import Typist from 'react-typist'
import { PageHeader as Header } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import SearchBox from 'components/SearchBox'

// .ant-page-header-heading-sub-title
const StyledPageHeader = styled(Header)`
  .ant-page-header-heading-left {
    overflow: visible;
  }
  .ant-page-header-heading-sub-title {
    overflow: visible;
  }
`
const PageHeader: React.FC = () => {
  const history = useHistory()
  const { hash } = useLocation()
  return (
    <StyledPageHeader
      className="site-page-header"
      style={{ border: '1px solid rgb(235, 237, 240)' }}
      onBack={(): void => {
        history.push(`/${hash}`)
      }}
      title="NaNa's World"
      extra={[
        <Typist key={1} stdTypingDelay={10} avgTypingDelay={40} cursor={{ show: false }}>
          have fun
          <Typist.Delay ms={500} />
        </Typist>,
      ]}
      subTitle={
        <>
          ❤️
          <SearchBox key={0} />
        </>
      }
      avatar={{ src: `${process.env.PUBLIC_URL}/cat.jpg` }}
    />
  )
}
export default PageHeader
