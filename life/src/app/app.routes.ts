import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { About } from './Pages/about/about';
import { Services } from './Pages/services/services';
import { Contact } from './Pages/contact/contact';
import { Blog } from './Pages/blog/blog';
import { Login } from './Pages/login/login';
import { Registration } from './Pages/registration/registration'; // Check this path
import { ForgotPassword } from './Pages/forgot-password/forgot-password';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'about',component:About},
    {path:'service',component:Services},
    {path:'contact',component:Contact},
    {path:'blog',component:Blog},
    {path:'login',component:Login},
    {path:'registration',component:Registration},
    {path:'forgot-password',component:ForgotPassword},
];
