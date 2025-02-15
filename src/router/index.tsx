import { PATH } from '../constants/config'
import { useRoutes } from "react-router-dom"
import ProjectManagement from '../pages/ProjectManagement'
import NotFound from '../pages/NotFound'
import TaskManagement from '../pages/TaskManagement'
import ProjectDetail from '../pages/ProjectDetail'

export const Router = () => {
  return useRoutes([
    {
        path: PATH.project,
        element: <ProjectManagement />
    },
    {
        path: PATH.task,
        element: <TaskManagement />
    },
    {
        path: PATH.projectdetail,
        element: <ProjectDetail />
    },
    {
        path: '*',
        element: <NotFound />
    },
])
}
