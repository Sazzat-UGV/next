import { Button } from '@/components/ui'
import Icon from '@/icon'
import React from 'react'

interface DeleteBtnProps {
  onClick?: () => void
  label?: string
  disabled?: boolean
}

export function DeleteBtn({ onClick, label = "Delete",disabled=false }: DeleteBtnProps) {
  return (
    <Button
     disabled={disabled}
      variant="ghost"
      className="rounded-md px-3 py-1 text-sm font-medium border-2 border-reds/20 text-reds hover:text-reds bg-[#FFE9E9] hover:bg-[#FFE9E9]"
      onClick={onClick}
    >
      <Icon name="deleteRed" />
      {label}
    </Button>
  )
}
