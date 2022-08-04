import { FC, MouseEventHandler } from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { Form } from './form'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'

export interface ItemProps {
  children: string
  id: string

  onRemove: (id: string) => void
  onSave: (text: string, id: string) => void
}

export const Item: FC<ItemProps> = ({
  children,
  id,

  onRemove,
  onSave,
}) => {
  const navigate = useNavigate()
  const params = useParams()

  const isEdit = `${id}` === params.taskId

  const handleEdit = useCallback(() => {
    navigate(`/edit/${id}`)
  }, [id, navigate])

  const handleCancel = useCallback(() => {
    navigate(`/`)
  }, [navigate])

  const handleSave = useCallback(
    (text: string) => {
      onSave(text, id)
      navigate(`/`)
    },
    [id, onSave, navigate]
  )

  const handleRemove = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation()

      onRemove(id)
    },
    [id, onRemove]
  )

  if (isEdit) {
    return <Form text={children} onCancel={handleCancel} onSave={handleSave} edit />
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleEdit}>
        <ListItemText primary={children} />
        <Tooltip title="Remove">
          <IconButton color="error" onClick={handleRemove}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  )
}
