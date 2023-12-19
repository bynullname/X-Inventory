<template>
    <div>
      <h1>HLS Stream Test</h1> 
      <video ref="videoPlayer" width="640" height="496" controls muted>
        <source :src="hlsUrl" type="application/vnd.apple.mpegurl">
        Your browser does not support HLS video.
      </video>
      <button @click="playVideo">播放视频</button>

    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { deviceConfig } from '~/config/index';

  const hlsUrl = deviceConfig.hlsUrl; //'http://192.168.31.93:3000/hls/playlist.m3u8'; // 替换为实际的 HLS URL
  const videoPlayer = ref(null);
  
  function playVideo() {
    if (videoPlayer.value) {
      videoPlayer.value.src = hlsUrl;
      videoPlayer.value.load();
      videoPlayer.value.play().catch(error => {
        console.log(error,hlsUrl)
      });
    }
  }


  onMounted(() => {

  });
  </script>
  