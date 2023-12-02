import { reactive } from 'vue';

export const sharedState = reactive({
  topScaleLinePercent: 0.1,
  leftScaleLinePercent: 0.4,
  rightScaleLinePercent: 0.9,
  isSynced: true,
});
