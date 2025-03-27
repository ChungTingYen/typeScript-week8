import {createHashRouter} from 'react-router'
import FrontLayout from '../layouts/FrontLayout'
import {HomePage,ProductsPage,ProductsPageFromWishList,CartPage,CheckoutFormPage} from '../pages/front'
const routes = [
    {
        path: "/",
        element:<FrontLayout />,
        children: [
            { index:true, element: <HomePage /> },
            { path:'products',element:<ProductsPage />},
            { path: "wishList", element: <ProductsPageFromWishList /> },
            { path: "cart", element: <CartPage /> },
            { path: "checkout", element: <CheckoutFormPage /> },
            // { path: "orderList", element: <OrderListsPage /> },
            // { path: "payment/:id", element: <CheckoutPaymentPageFromOrders /> },
        ]
    }
];

const router = createHashRouter(routes);

export default router;