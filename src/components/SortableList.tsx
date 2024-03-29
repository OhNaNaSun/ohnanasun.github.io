import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'
import AccordionDetail from 'components/AccordionDetail'
import { useHistory } from 'react-router-dom'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import tabContentMap from '../constants'
import { SortableListContainerProps, QuestionStateType, QuestionMapType } from '../types'
import AlertDialog from './AlertDialog'

const SortableListContainer: React.FC<SortableListContainerProps> = ({
  collapseItem,
  questionList,
  onSortEnd,
  deleteDoc,
  tabIndex,
  moveToTop,
}) => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const SortableItem = SortableElement(({ value, sortIndex }: { value: QuestionStateType; sortIndex: number }) => {
    const { title, id, isExpanded, content } = value
    return (
      <>
        <Card
          style={{
            background: 'rgb(58, 64, 76)',
            marginTop: '2px',
          }}
        >
          <CardHeader
            disableTypography
            action={
              <>
                <IconButton
                  onClick={(): void => collapseItem(!isExpanded, sortIndex)}
                  size="small"
                  color="inherit"
                  aria-label="Expand"
                  component="span"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <IconButton
                  onClick={(): void => moveToTop(sortIndex)}
                  size="small"
                  color="inherit"
                  aria-label="Move to top"
                  component="span"
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                  onClick={(): void => {
                    history.push(`/${tabContentMap[tabIndex].key}/${id}`)
                  }}
                  size="small"
                  color="inherit"
                  aria-label="Move to top"
                  component="span"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(): void => {
                    setDeletingId(id)
                    setIsOpen(true)
                  }}
                  size="small"
                  color="inherit"
                  aria-label="Delete"
                  component="span"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </>
            }
            title={title}
          />
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Divider />
            <CardContent>
              <AccordionDetail {...{ content, isExpanded, sortIndex, collapseItem }} />
            </CardContent>
          </Collapse>
        </Card>
        <Divider />
      </>
    )
  })
  const SortableList = SortableContainer(({ items }: { items: QuestionMapType }) => {
    return (
      <div>
        {(items || []).map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} sortIndex={index} value={value} />
        ))}
      </div>
    )
  })
  return (
    <>
      <SortableList distance={2} items={questionList || []} onSortEnd={onSortEnd} />
      <AlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={
          questionList?.find(({ id }) => {
            return id === deletingId
          })?.title
        }
        confirmCallback={(): void => {
          deleteDoc(deletingId)
        }}
      />
    </>
  )
}
export default SortableListContainer
