import MainDashboard from "./pages/dashboard/MainDashboard"
import Login from "./pages/auth/Login"
import User from "./pages/dashboard/User"
import Category from "./pages/dashboard/Category"
import Product from "./pages/dashboard/Product"
import HomeContent from "./pages/dashboard/HomeContent"
import AboutUs from "./pages/dashboard/AboutUs"
import ContactUs from "./pages/dashboard/ContactUs"


export const AdminRoutes = [
    {
        name_var: 'Dashboard',
        url_var: '',
        icon_var: 'ri-home-line'
    },
    {
        name_var: 'Home Content',
        url_var: 'home-content',
        icon_var: 'ri-home-line',
        children: []
    },
    {
        name_var: 'Product',
        url_var: 'product-catalog',
        icon_var: 'ri-home-line',
        children: []
    },
    {
        name_var: 'Product Category',
        url_var: 'product-category',
        icon_var: 'ri-home-line',
        children: []
    },
    {
        name_var: 'About Us',
        url_var: 'about-us',
        icon_var: 'ri-home-line',
        children: []
    },
    {
        name_var: 'Contact Us',
        url_var: 'contact-us',
        icon_var: 'ri-home-line',
        children: []
    },
    {
        name_var: 'User Management',
        url_var: 'user-management',
        icon_var: 'ri-home-line',
        children: []
    },
]



export const dashboardRoutes = [
    {
        path: '',
        component: <MainDashboard />
    },
    {
        path : "home-content",
        component: <HomeContent />
    },
    {
        path : "product-category",
        component: <Category />
    },
    {
        path : "about-us",
        component: <AboutUs />
    },
    {
        path : "contact-us",
        component: <ContactUs />
    },
    {
        path : "product-catalog",
        component: <Product />
    },
    {
        path : "user-management",
        component: <User />
    },
    // USER ROUTE
]


export const AuthRoutes = [
    {
        path: 'sign-in',
        component: <Login />
    },
    // {
    //     path: 'sign-up',
    //     component: <Register />
    // },
    // {
    //     path: 'otp-validate',
    //     component: <OtpPage />
    // },
]