/**
 * Model Company
 *
 */
type Company = {
  id: string
  displayName: string
  legalName: string
  category: string
}

/**
 * Model Profile
 *
 */
type Profile = {
  id: string
  email: string
  phone: string
  residency: string
  userId: string
}

/**
 * Model Expertise
 *
 */
type Expertise = {
  id: string
  displayName: string
}

/**
 * Model User
 *
 */
type User = {
  id: string
  displayName: string
  userName: string
  email: string
  code: string
  password: string
  active: boolean
  refreshToken: string | null
}

/**
 * Model InterviewEvaluation
 *
 */
type InterviewEvaluation = {
  id: string
  userId: string
  interviewParticipantId: string
  description: string
  confidence: number
  communication: number
  idiom: number
  leadership: number
  creativity: number
  problemSolving: number
  motivation: number
  english: number
}

/**
 * Model InterviewParticipant
 *
 */
type InterviewParticipant = {
  id: string
  displayName: string
  email: string
  interviewAt: Date
  verdict: string | null
  evaluation: InterviewEvaluation[]
}

/**
 * Model Role
 *
 */
type Role = {
  id: string
  code: string
}

/**
 * Model Permission
 *
 */
type Permission = {
  id: string
  code: string
}

/**
 * Model Event
 *
 */
type Event = {
  id: string
  slug: string
  displayName: string
  description: string
  type: string
  startDate: Date
  endDate: Date | null
}
