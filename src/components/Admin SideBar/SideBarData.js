
import React from 'react'
// import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsIcon from '@mui/icons-material/Payments';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import ForumIcon from '@mui/icons-material/Forum';

export const SideBarData=[
    {
        title : "Home",
        icon : <HomeIcon />,
        link : "/adminhome"
    },
    {
        title : "Stores",
        icon : <StoreIcon />,
        link : "/admin_stores"
    },{
        title : "Categories",
        icon : <CategoryIcon />,
        link : "/admin_category"
    },
    {
        title : "Products",
        icon : <InventoryIcon />,
        link : "/admin_products"
    },
    {
        title : "Customers",
        icon : <PersonIcon />,
        link : "/admin_customers"
    },
    {
        title : "Payments",
        icon : <PaymentsIcon />,
        link : "/admin_payments"
    },
    {
        title : "Feedbacks",
        icon : <ForumIcon />,
        link : "/admin_feedbacks"
    },{
        title : "Logout",
        icon : <LogoutIcon />,
        link : "/adminlogin"
    }

]