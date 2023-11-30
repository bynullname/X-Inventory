// ~/config/index.ts
// 获取当前窗口的主机名（例如 'example.com' 或 '192.168.31.177'）
// const currentHost = window.location.hostname;//'192.168.31.177';
const currentHost = '192.168.31.177';
export const deviceConfig = {
    apiUrl: `http://${currentHost}:5000`,
    wsUrl: `ws://${currentHost}:7878`,
    apiKey: '',
    // 其他配置...
};
