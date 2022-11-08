import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

type PaginationProp = {
  count: number
  page: number
  onChange: (event: any, value: number) => void
}

export const PaginationCustom: React.FC<PaginationProp> = ({ count = 1, page = 1, onChange = () => {} }) => {
  return (
    <Pagination
      variant="text"
      count={count}
      page={page}
      onChange={onChange}
      renderItem={(item) => <PaginationItem components={{ previous: ArrowLeftIcon, next: ArrowRightIcon }} {...item} />}
    />
  )
}
