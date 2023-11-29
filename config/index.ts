// ~/config/index.ts

const BASE_IP = '192.168.31.177';

export const deviceConfig = {
    apiUrl: `http://${BASE_IP}:5000`,
    wsUrl: `ws://${BASE_IP}:7878`,
    apiKey: '',
    // 其他配置...
};
