<template>
  <header class="header">
    <img class="logo" src="/logo.png" alt="Logo">
    <h1 class="title">X-Inventory</h1>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: rgb(50, 41, 41);
  color: white;
  padding: 10px 20px;
  position: fixed;  /* 固定定位 */
  top: 0;          /* 在顶部 */
  width: 100%;     /* 宽度充满屏幕 */
  z-index: 1000;   /* 确保在页面内容上方 */
}

.logo {
  height: 50px; /* 根据你的 Logo 尺寸调整 */
  margin-right: 20px;
}

.title {
  font-size: 24px;
  margin: 0;
}
</style>
