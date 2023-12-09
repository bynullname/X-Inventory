// ~/config/index.ts
// 获取当前窗口的主机名（例如 'example.com' 或 '192.168.31.177'）
// const currentHost = window.location.hostname;
// const currentHost = '10.138.140.253';
const currentHost = '192.168.31.93';

export const deviceConfig = {
    apiUrl: `http://${currentHost}:5000`,
    wsUrl: `ws://${currentHost}:7878`,
    apiKey: '',
    camera_roi_bottom:0.99
    // 其他配置...
};
