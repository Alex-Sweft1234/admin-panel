export type messageVariants = 'success' | 'warning' | 'error' | 'info' | 'reset'
export type Message = string[]

export enum ApiAnswerStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  NEED_FULL_REGISTER = 402,
}

export enum TOKEN {
  PRIVATE = 'token_private',
}
