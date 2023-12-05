export type TAcademicCode = '01' | '02' | '03'
export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TSemesterName = 'Autumn' | 'Summer' | 'Fall'

export interface TAcademicSemester {
  name: string
  code: TAcademicCode
  year: string
  startMonth: TMonths
  endMonth: TMonths
}


export interface TSemesterNameAndCode {
  [key: string]: string
}
