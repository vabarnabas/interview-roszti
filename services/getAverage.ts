export const getAverage = (values: {
  confidence: number
  communication: number
  idiom: number
  leadership: number
  creativity: number
  problemSolving: number
  motivation: number
  english: number
}) => {
  console.log(values)

  return (
    (values.communication +
      values.confidence +
      values.creativity +
      values.english +
      values.idiom +
      values.leadership +
      values.motivation +
      values.problemSolving) /
    8
  )
}

export const getEvaluationAverage = (values: number[]) => {
  return values.reduce((a, b) => a + b, 0) / values.length
}
