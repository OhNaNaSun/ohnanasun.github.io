export interface QuestionData {
  content?: string
  title: string
  id: string
  seq: number
}
export enum categoryContants {
  Post = 'post',
  JavaScript = 'javascript',
  HTML = 'html',
  React = 'react',
  CSS = 'css',
}
export type categoryType = 'javascript' | 'html' | 'react' | 'css'
// export type docCountType = { [key in categoryType]: number }
export type docCountType = { [key: string]: number }
// export docMaptype
export type QuestionStateType = QuestionData & { isExpanded: boolean }
export type QuestionMapType = QuestionStateType[]
export interface SortableListContainerProps {
  tabIndex: number
  collapseItem: (isExpanded: boolean, index: number) => void
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void
  deleteDoc: (id: string) => Promise<void>
  questionList: QuestionMapType | null
  moveToTop: (arg0: number) => void
}
