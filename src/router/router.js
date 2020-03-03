import LandingPage from '../components/LandingPage.vue'
import Che from '../components/Che.vue'
import Choose from '../components/Choose.vue'
import Result from '../components/Result.vue'
import Login from '../components/Login.vue'
import Regist from '../components/Regist.vue'
import Wish from '../components/Wish.vue'
export const routes = [
	{path:'/',component:LandingPage},
	{path:'/che',component:Che},
	{path:'/choose',component:Choose},
	{path:'/login',component:Login},
	{path:'/regist',component:Regist},
	{path:'/wish',component:Wish}
]