import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'
import Categories from '../pages/Categories'
import Lectures from '../pages/Lectures'
import Students from '../pages/Students'
import { CategoryProvider } from '../contexts/category';
import { AdminProvider } from '../contexts/admin';
import { AuthProvider } from '../contexts/auth';
const Routes = () => {
    
    return (
        <AuthProvider>
        <CategoryProvider>
            <AdminProvider>
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/products' component={Courses} />
                    <Route path='/categories' component={Categories} />
                    <Route path='/lecturers' component={Lectures} />
                    <Route path='/students' component={Students} />
                </Switch>
            </AdminProvider>
        </CategoryProvider>
        </AuthProvider>
    )
}

export default Routes
