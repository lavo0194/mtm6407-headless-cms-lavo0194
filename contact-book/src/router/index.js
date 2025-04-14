import { createRouter, createWebHistory } from 'vue-router'


import Home from '../views/Home.vue'
import ViewContact from '../views/ViewContact.vue'
import AddEditContact from '../components/AddEditContact.vue' 

const routes = [
  { path: '/', component: Home }, 
  { path: '/view/:id', component: ViewContact }, 
  { path: '/add', component: AddEditContact },  
  { path: '/edit/:id', component: AddEditContact } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router




