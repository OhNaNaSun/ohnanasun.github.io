import React, { ChangeEvent, useState } from 'react'
import { Input, List } from 'antd'

const { Search } = Input

const SearchBox: React.FC = () => {
  const [searchResult, setSearchResult] = useState([])
  const handleSearch = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { value } = e.target
    console.log('on search', value)
    const searchReponse = await fetch(`${process.env.PUBLIC_URL}/api/files/search?content=${value}`)
    const result = await searchReponse.json()
    console.log(result)
    setSearchResult(result)
  }
  return (
    <div style={{ width: 400, position: 'relative' }}>
      <Search
        placeholder="input search text"
        style={{ width: '100%', margin: '0 10px' }}
        allowClear
        onChange={handleSearch}
      />
      <List
        itemLayout="horizontal"
        style={{
          position: 'absolute',
          width: '100%',
          marginLeft: '10px',
          backgroundColor: 'white',
          top: '102%',
          zIndex: 100,
          boxShadow: '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)',
        }}
        dataSource={searchResult}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  )
}
export default SearchBox
