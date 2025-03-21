import {createHashRouter} from 'react-router'
import FrontLayout from '../layouts/FrontLayout'

const routes = [
    {
        path: "/",
        element:<FrontLayout />
    }
];

const router = createHashRouter(routes);

export default router;