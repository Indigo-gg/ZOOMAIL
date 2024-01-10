import {secondGet} from "@/api/env.config";
function getAllPlaylist(params){
    return secondGet(params,'/playlist/track/all')
}
function getPlaylist(params){
    return secondGet(params,'/playlist/detail')
}

function getSong(params){
    return secondGet(params,'/song/url')
}



export {getAllPlaylist,getSong,getPlaylist}
