import {createHashRouter} from 'react-router'
import FrontLayout from '../layouts/FrontLayout'
import {HomePage,ProductsPage,ProductsPageFromWishList,
    CartPage,CheckoutFormPage,NotFoundPage,ProductDetailPage} from '../pages/front'
const routes = [
    {
        path: "/",
        element:<FrontLayout />,
        children: [
            { index:true, element: <HomePage /> },
            { path:'products',element:<ProductsPage />},
            { path: "product/:id",element: <ProductDetailPage />,},
            { path: "cart", element: <CartPage /> },
            { path: "checkout", element: <CheckoutFormPage /> },
            // { path: "orderList", element: <OrderListsPage /> },
            // { path: "payment/:id", element: <CheckoutPaymentPageFromOrders /> },
            { path: "wishList", element: <ProductsPageFromWishList /> },
            { path: "*",element: <NotFoundPage />,},
        ]
    }
];

const router = createHashRouter(routes);

export default router;