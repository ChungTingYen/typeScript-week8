import {createHashRouter} from 'react-router'
import FrontLayout from '../layouts/FrontLayout'
import {HomePage,ProductsPage,ProductsPageFromWishList,CartPage} from '../pages/front'
const routes = [
    {
        path: "/",
        element:<FrontLayout />,
        children: [
            { index:true, element: <HomePage /> },
            { path:'products',element:<ProductsPage />},
            { path: "wishList", element: <ProductsPageFromWishList /> },
            { path: "cart", element: <CartPage /> },
        ]
    }
];

const router = createHashRouter(routes);

export default router;