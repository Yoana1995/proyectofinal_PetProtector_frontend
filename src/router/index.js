import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/usu/HomeView.vue'
import adminLayout from '../views/admin/adminLayout.vue'
import AuthAPI from '@/api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      component: adminLayout,
      meta: { requiresAuth: true},
      children: [
        {
          path: 'mascotas',
          name: 'mascotas',
          component: () => import('../views/admin/adminmascotasView.vue'),
        },
        {
          path: 'adopciones',
          name: 'adopciones',
          component: () => import('../views/admin/adminadopcionView.vue'),
        },
        {
          path: 'acogidas',
          name: 'acogidas',
          component: () => import('../views/admin/adminacogidaView.vue'),
        },
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'registromascota',
          name: 'registerpet',
          component: () => import('../views/admin/adminmascotaView.vue'),
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'adopcion',
          name: 'adopcion',
          component: () => import('../views/usu/adopcionView.vue'),
        },
        {
          path: 'acogida',
          name: 'acogida',
          component: () => import('../views/usu/acogidaView.vue'),
        },
        {
          path: 'mascota',
          name: 'mascota',
          component: () => import('../views/usu/mascotaView.vue'),
        },
        {
          path: '/auth',
          name: 'auth',
          component: () => import('../views/auth/AuthLayout.vue'),
          children: [
            {
              path: 'confirmar-cuenta/:token',
              name: 'confirm-account',
              component: () => import('../views/auth/ConfirmAccountView.vue')
            },
            {
              path: 'login',
              name: 'login',
              component: () => import('../views/auth/LoginView.vue')
            },
            {
              path: 'olvide-password',
              name: 'forgot-password',
              component: () => import('../views/auth/ForgotPasswordView.vue')
            },
            {
              path: 'olvide-password/:token',
              name: 'new-password',
              component: () => import('../views/auth/NewPasswordView.vue')
            }
          ]
        }
      ]
    }
  ]
})

// se executa antes de mostrar la informacion de una página
// to -> a donde vamos
// from -> de donde venimos
// next -> permite que se muestre la vista(sigue funcionando)

router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  // console.log(requiresAuth)
  if(requiresAuth) { // si la pagina requiere autentificacion
    try {
      const { data } =  await AuthAPI.auth()
      // if(data.admin) {
      //   next({name: 'admin'})
      // } else {
      //   next()
      // }
      // console.log(data)
      next()
    } catch (error) {
      next({name: 'home'})
    }
  } else {
    next()
  }
})

// router.beforeEach( async (to, from, next) => {
// const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
// if(requiresAdmin) {
//   try {
//     await AuthAPI.admin()
//     next()
//   } catch (error) {
//     next({name: 'login'})
//   }
// } else {
//   next()
// }

// })

export default router
