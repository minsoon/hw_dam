export const mapToSelectOptions = <T>(list: T[] = [], keyField: keyof T, labelField: keyof T) =>
  list.map(item => ({
    key: Number(item[keyField]),
    value: String(item[labelField]),
  }))
