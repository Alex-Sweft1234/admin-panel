import React, { useEffect } from 'react'

export type WithPlannerProps = {
  planner?: {
    timeout(f: () => void, t: number): NodeJS.Timeout
    interval(f: () => void, t: number): NodeJS.Timeout
    clearTimeouts(): boolean
    clearIntervals(): boolean
  }
}

export const withPlanner = <P extends WithPlannerProps>(Child: React.FC<P>): React.FC<P> => {
  return ({ ...props }): JSX.Element => {
    const timeouts: NodeJS.Timeout[] = []
    const intervals: NodeJS.Timeout[] = []

    useEffect(() => {
      return () => {
        timeouts.map((item) => clearTimeout(item))
        intervals.map((item) => clearInterval(item))
      }
    }, [])

    const planner = {
      timeout: (f: () => void, t: number): NodeJS.Timeout => {
        const id = setTimeout(f, t)
        timeouts.push(id)
        return id
      },
      clearTimeouts: () => {
        timeouts.map((item) => clearTimeout(item))
        return true
      },

      interval: (f: () => void, t: number): NodeJS.Timeout => {
        const id = setInterval(f, t)
        intervals.push(id)
        return id
      },
      clearIntervals: () => {
        timeouts.map((item) => clearTimeout(item))
        return true
      },
    }

    return <Child {...props} planner={planner} />
  }
}
