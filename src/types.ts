export interface QuestionData {
  content?: string
  title: string
  id: string
  seq: number
}
export enum categoryContants {
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
