import {createRouter, createWebHashHistory} from 'vue-router'
// import Home from '../views/Home.vue'
import {DEFAULT_INDEX_TOOL} from "@/store/constant";
import Index from '@/views/Index.vue'
import Mail from "@/views/mail/Mail.vue"
import Microphone from "@/views/microphone/Microphone.vue";
import User from "@/views/user/User.vue";
import More from "@/views/more.vue"
import Read from '@/views/mail/read.vue'
import Write from '@/views/mail/write.vue'
import Login from '@/views/user/login.vue'
import MailList from "@/views/mail/mailList";
import ReadPage from "@/views/mail/readPage";
import My from '@/views/mail/my'
import Music from '@/views/music/music'
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        redirect:DEFAULT_INDEX_TOOL,
        children: [
            {
                path: '/mail',
                name: 'mail',
                component: Mail
            },
            {
                path: '/microphone',
                name: 'microphone',
                component: Microphone,
            },
            {
                path: '/music',
                name: 'music',
                component: Music,
            },
            {
              name:'more',
              path:'/more',
                component: More
            },
            {
                path: '/user',
                name: 'user',
                component: User
            },

        ]

    },


    {
        name:'mailList',
        path: '/mailList',
        component: MailList
    },
    {
        path:'/read',
        name:'read',
        component: Read

    },
    {
        path: '/write',
        name:'write',
        component: Write
    },
    {
        name: 'my',
        path: '/my',
        component: My
    },

    {
        path: '/login',
        name:'login',
        component: Login
    },{
    path: '/aMail',
        name:'aMail',
        component: ReadPage
    }

]

const router = createRouter({
    mode: 'hash',
    history:createWebHashHistory(),
    routes
})

export default router
