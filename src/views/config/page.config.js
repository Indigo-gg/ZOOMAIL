import {BG_SIZE, DEFAULT_INDEX_TOOL} from "@/store/constant";

export const config={
    version:'V 1.7',
    index:DEFAULT_INDEX_TOOL,
    pageList:[

        {
            title:'信函',
            path:'/mail',
            name:'mail',
            icon:'mail',

        },
        {
            title:'八音盒',
            path:'/music',
            name:'music',
            icon:'music'
        },

        // {
        //     title:'更多',
        //     path:'/more',
        //     name:'more',
        //     icon:'more'
        // }
    ],
    funList:[
        {
            title:'写信',
            path:'/write',
            name:'write',
            icon:require('@/assets/background/pen2.png'),
            isOpen:true,
            status:'设计中'
        },
        {
            title:'八音盒',
            path:'/music',
            name:'music',
            icon:require('@/assets/background/music.png'),
            isOpen:false,
            status:'设计中'


        },
        {
            title:'待开放',
            path:'/',
            name:'222',
            icon:require('@/assets/background/camera.png'),
            isOpen:false,
            status:'设计中'
        }
    ],
    getPageInfoByName:function (name){
        return this.pageList.find(item=>{
            return item.name===name
        })
    },
    getNextPageByName:function (name){
        for(let i=0;i<this.pageList.length;i++){
            if(name===this.pageList[i].name)
                return this.pageList[(i+1)%this.pageList.length]
        }
    },
    getPrevPageByName:function (name){
        for(let i=0;i<this.pageList.length;i++){
            if(name===this.pageList[i].name)
                return this.pageList[(i-1+this.pageList.length)%this.pageList.length]
        }
    },
    image:{
        getImgByNo:(no)=>{
          return   require (`@/assets/background/${no}.jpg`)
        },
        mail:require('@/assets/background/mail.png'),
        back:require('@/assets/background/fly.png'),
        bottle:require("@/assets/background/bottle.png"),
        mirror2:require('@/assets/background/mirror2.png'),
        earphone:require('@/assets/background/earphone.png'),
        ufo:require('@/assets/background/UFO.png'),
        flower:require("@/assets/background/flower.png"),
        BGImgSize:BG_SIZE
    }
}

export default config
