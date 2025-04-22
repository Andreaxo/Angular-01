import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './form-product/form-product.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users'
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'users/create',
        component: UserFormComponent
    },
    {
        path: 'users/edit/:id',
        component: UserFormComponent
    },
    {
        path: 'productos', 
        component: ProductosComponent 
    },
    {
        path: 'productos/create',
        component: CrearProductoComponent
    },
    {
        path: 'productos/edit/:id',
        component: CrearProductoComponent
    }
];
