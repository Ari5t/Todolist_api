import { ChangeEventHandler, FC, FormEventHandler, forwardRef, useCallback, useState } from 'react'

import ListItem from '@mui/material/ListItem'

import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

export interface FormProps {
  text?: string

  edit?: boolean

  onCancel?: () => void
  onSave: (text: string) => void
}

export const Form: FC<FormProps> = forwardRef<HTMLInputElement, FormProps>(({
  text: defaultText = '',

  edit: isEdit = false,

  onCancel: handleCancel,
  onSave,
}, ref) => {
  const [text, setText] = useState(defaultText)
  const handleChangeText = useCallback<ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>>(event => {
    setText(event.target.value)
  }, [])

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(event => {
    event.preventDefault()

    onSave(text)
    setText('')
  }, [text, onSave])

  return (
    <ListItem disablePadding>
      <Box
        component="form"
        width="100%"
        display="grid"
        gridTemplateColumns={['1fr', ...(handleCancel ? ['min-content'] : []), ...(text !== '' ? ['min-content'] : [])].join(' ')}
        sx={{ px: 1, py: 0.5 }}
        onSubmit={handleSubmit}
      >
        <TextField size="small" fullWidth value={text} onChange={handleChangeText} inputProps={{ ref }} />
        {handleCancel ? (
          <Tooltip title="Cancel">
            <IconButton
              type="reset"
              onClick={handleCancel}
              color="error"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {text !== '' ? (
          <Tooltip title={isEdit ? 'Save' : 'Add'}>
            <IconButton
              type="submit"
              color="success"
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Box>
    </ListItem>
  )
})