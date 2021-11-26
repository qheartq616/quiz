<template>
  <div class="home">
    <router-link to="/userInfo" replace class="home-link"></router-link>
  </div>
</template>


<style scoped lang="less">
.home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff url(../assets/1.jpg) no-repeat center center/auto 100%;
    .home-link{
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>