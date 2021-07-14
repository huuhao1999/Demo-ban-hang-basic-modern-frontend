import React, {useEffect} from 'react'

import { Route, Switch,Redirect } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'
import Categories from '../pages/Categories'
import Lectures from '../pages/Lectures'
import Students from '../pages/Students'
import { CategoryProvider } from '../contexts/category';
import { AdminProvider } from '../contexts/admin';
import { AuthProvider } from '../contexts/auth';
import Login from '../pages/login';
import { useHistory } from "react-router-dom";
const Routes = () => {
    const storedDataUser = localStorage.getItem('account-admin');
    let hisory = useHistory();
    useEffect(() => {
        if(!storedDataUser){
            hisory.push('/login')
        }
    })


    return (
        <AuthProvider>
        <CategoryProvider>
            <AdminProvider>
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/products' component={Courses} />
                    <Route path='/categories' component={Categories} />
                    <Route path='/orders' component={Lectures} />
                    <Route path='/students' component={Students} />
                    <Route path='/login' exact component={Login} />
                </Switch>
            </AdminProvider>
        </CategoryProvider>
        </AuthProvider>
    )
}

export default Routes
