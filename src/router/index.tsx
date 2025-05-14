import { createHashRouter } from 'react-router'
import { RouteObject } from "react-router-dom";
import FrontLayout from '../layouts/FrontLayout'
import {
    HomePage, ProductsPage, ProductsPageFromWishList,
    CartPage, CheckoutFormPage, NotFoundPage, ProductDetailPage,
    CheckoutPaymentPageFromOrders, OrderListsPage
} from '../pages/front'
const routes: RouteObject[] = [
    {
        path: "/",
        element: <FrontLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'products', element: <ProductsPage /> },
            { path: "product/:id", element: <ProductDetailPage />, },
            { path: "cart", element: <CartPage /> },
            { path: "checkout", element: <CheckoutFormPage /> },
            { path: "orderList", element: <OrderListsPage /> },
            { path: "payment/:id", element: <CheckoutPaymentPageFromOrders /> },
            { path: "wishList", element: <ProductsPageFromWishList /> },
            { path: "*", element: <NotFoundPage />, },
        ]
    }
];

const router = createHashRouter(routes);

export default router;