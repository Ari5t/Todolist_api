import { Route, Routes } from 'react-router-dom'
import { Error } from '../pages/error'
import { Main } from '../pages/main'

export const Router = () => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route path="task">
        <Route path=":taskId" />
      </Route>
    </Route>
    <Route path="*" element={<Error />} />
  </Routes>
)
