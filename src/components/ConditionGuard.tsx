import React from 'react'

export default function ConditionGuard({ condition, children }: { children: React.ReactNode, condition: boolean }) {
  if (!condition) {
    return null
  }
  return (
    <div>{children}</div>
  )
}
