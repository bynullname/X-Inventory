import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useIsMobile() {
  if (process.client){
    return document.documentElement.clientWidth < 1024
  }
}