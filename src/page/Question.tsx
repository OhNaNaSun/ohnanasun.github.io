import React, { useEffect, useState, useCallback } from 'react'
import Tabs from '@material-ui/core/Tabs'
import { useLocation } from 'react-router-dom'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MessageBar from 'components/MessageBar'

import CircularProgress from '@material-ui/core/CircularProgress'
import arrayMove from 'array-move'
import SortableList from 'components/SortableList'
import useStyles from './QuestionStyle'
import { QuestionData, QuestionMapType, docCountType } from '../types'

import tabContentMap from '../constants'

const QuestionPage: React.FC = () => {
  const classes = useStyles()
  const { hash } = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [countMap, setCountMap] = useState<docCountType | null>(null)
  const [message, setMessage] = useState<{ text: string; status: 'success' | 'error' } | null>(null)
  const hashTabIndex = tabContentMap.findIndex(({ key }) => key === hash.replace('#', ''))
  const [tabIndex, setTabIndex] = React.useState(hashTabIndex !== -1 ? hashTabIndex : 0)

  const [questionList, setQuestionList] = useState<QuestionMapType>([])
  const fetchDoc = useCallback(() => {
    ;(async (): Promise<void> => {
      setIsLoading(true)
      const fileMapResponse = await fetch(`${process.env.REACT_APP_API_URL}/documents/${tabContentMap[tabIndex].key}`)
      const fileMap = await fileMapResponse.json()
      setIsLoading(false)
      setQuestionList(
        fileMap
          .map((item: QuestionData) => {
            return { ...item, isExpanded: false }
          })
          .sort((a: QuestionData, b: QuestionData) => a.seq - b.seq)
      )
    })()
  }, [tabIndex])
  useEffect(() => {
    ;(async (): Promise<void> => {
      const countMapResponse = await fetch(`${process.env.REACT_APP_API_URL}/documents/count`)
      const countMapData = await countMapResponse.json()
      setCountMap(countMapData)
    })()
  }, [tabIndex])

  useEffect(() => {
    fetchDoc()
  }, [fetchDoc])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number): void => {
    setTabIndex(newValue)
  }
  const deleteDoc = async (id: string): Promise<void> => {
    const fileMapResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/documents/${tabContentMap[tabIndex].key}/${id}`,
      {
        method: 'DELETE',
      }
    )
    const res = await fileMapResponse.json()
    if (res.status === 'success') {
      setMessage({ status: res.status, text: res.message })
      fetchDoc()
    }
  }
  const collapseItem = async (isExpanded: boolean, index: number): Promise<void> => {
    let { content } = questionList[index]
    if (isExpanded && !content) {
      const getDocContent = await fetch(
        `${process.env.REACT_APP_API_URL}/documents/${tabContentMap[tabIndex].key}/${questionList[index].id}`,
        {
          method: 'GET',
        }
      )
      const res = await getDocContent.json()
      content = res.content
    }
    setQuestionList((pre) => {
      const newState = [...pre]
      newState[index] = { ...newState[index], isExpanded, content }
      return newState
    })
  }
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
    setQuestionList((preItems) => arrayMove(preItems || [], oldIndex, newIndex))
  }
  const moveToTop = (oldIndex: number): void => {
    setQuestionList((preItems) => arrayMove(preItems || [], oldIndex, 0))
  }
  const saveSort = async (): Promise<void> => {
    const ids = questionList.map(({ id }) => id)
    const getDocContent = await fetch(`${process.env.REACT_APP_API_URL}/documents/${tabContentMap[tabIndex].key}/seq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(ids),
    })
    const res = await getDocContent.json()
    setMessage({ status: res.status, text: res.message })
  }
  return (
    <div className={classes.root}>
      {message && <MessageBar messageIn={message} />}
      <Button onClick={saveSort} color="secondary">
        Save Order
      </Button>
      <Button href={`${tabContentMap[tabIndex].key}/add`} color="secondary">
        + Add
      </Button>
      <Tabs value={tabIndex} onChange={handleChange}>
        {tabContentMap.map(({ key, name }) => (
          <Tab key={key} label={`${name} ${countMap ? `(${countMap[key]})` : ''}`} />
        ))}
      </Tabs>
      <div role="tabpanel">
        <Box p={3} className={classes.questionBox}>
          {isLoading ? (
            <CircularProgress size={30} color="secondary" />
          ) : (
            <Box width="100%">
              <SortableList {...{ moveToTop, tabIndex, collapseItem, onSortEnd, deleteDoc, questionList }} />
              <Button href={`${tabContentMap[tabIndex].key}/add`} color="secondary">
                + Add
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </div>
  )
}
export default QuestionPage
