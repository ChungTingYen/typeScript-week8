import {createHashRouter} from 'react-router'
import FrontLayout from '../layouts/FrontLayout'
import {HomePage,ProductsPage} from '../pages/front'
const routes = [
    {
        path: "/",
        element:<FrontLayout />,
        children: [
            { index:true, element: <HomePage /> },
            {path:'/products',element:<ProductsPage />}
        ]
    }
];

const router = createHashRouter(routes);

export default router;