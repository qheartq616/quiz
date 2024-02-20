import server from "@/common/axios"; 

// 排名榜
export const rankList = (params) => {
    return server({
        url: "/QQMusicApi/data/rankList",
        method: "post",
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

// 更新排名榜
export const updateRankList = (params) => {
    return server({
        url: "/QQMusicApi/data/updateRankList",
        method: "post",
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

// 在线下载（就当在线播放用吧）
export const songUrl = (params) => {
    return server({
        url: "/QQMusicApi/song/url",
        method: "post",
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}