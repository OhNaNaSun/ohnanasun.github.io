export interface QuestionData {
  content?: string
  title: string
  id: string
}
export type QuestionStateType = QuestionData & { isExpanded: boolean }
export type QuestionMapType = QuestionStateType[]
