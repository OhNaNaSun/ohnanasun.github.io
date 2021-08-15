export interface QuestionData {
  content?: string
  title: string
  id: string
  seq: number
}
export type QuestionStateType = QuestionData & { isExpanded: boolean }
export type QuestionMapType = QuestionStateType[]
