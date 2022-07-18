import { FC, MouseEventHandler, useState } from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { Form } from './form'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useCallback } from 'react'

export interface ItemProps {
  children: string
  id: number
  index: number

  onRemove: (id: number, index: number) => void
  onSave: (text: string, id: number) => void
}

export const Item: FC<ItemProps> = ({
  children,
  index,
  id,

  onRemove,
  onSave,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = useCallback(() => setIsEdit(true), [])
  const handleCancel = useCallback(() => setIsEdit(false), [])

  const handleSave = useCallback((text: string) => {
    onSave(text, id)
    setIsEdit(false)
  }, [id, onSave])

  const handleRemove = useCallback<MouseEventHandler<HTMLButtonElement>>(event => {
    event.stopPropagation()

    onRemove(id, index)
  }, [id, index, onRemove])

  if (isEdit) {
    return (
      <Form text={children} onCancel={handleCancel} onSave={handleSave} edit />
    )
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleEdit}>
        <ListItemText primary={children} />
        <Tooltip title="Remove">
          <IconButton color="error" onClick={handleRemove}  >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  )
}