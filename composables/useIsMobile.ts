import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useIsMobile() {
  const isMobile = ref(window.innerWidth <= 600);

  // const updateIsMobile = () => {
  //   isMobile.value = window.innerWidth <= 600;
  // };

  // onMounted(() => {
  //   window.addEventListener('resize', updateIsMobile);
  // });

  // onBeforeUnmount(() => {
  //   window.removeEventListener('resize', updateIsMobile);
  // });

  return isMobile;
}