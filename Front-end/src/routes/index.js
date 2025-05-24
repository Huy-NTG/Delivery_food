import { LoginLayout } from '~/components/Layout';
import { SignupLayout } from '~/components/Layout';
import Login from '~/pages/Login';
import Home from '../pages/Home';
import Signup from '~/pages/Signup';
import Payment from '../pages/Payment';
import Dashboard from '~/pages/Admin';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/payment', component: Payment },
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/signup', component: Signup, layout: SignupLayout },
    { path: '/admin/*', component: Dashboard },
     
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
