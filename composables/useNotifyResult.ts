export function useNotifyResult(data:any) {
   const isMute = useState('isMute')

    if(data.msgType==='newItem'){
        // console.log(data.msg)
        if(data.msg.inventory_result==='正常')
        {
          ElNotification({
            title: '盘点成功',
            message: data.msg.location_number,
            type: 'success',
            duration:3000,
          })
        }
        if(isMute.value){

        }
        else{
          const beepSound = new Audio('/beep.wav');
          beepSound.volume = 0.5; // 设置音量，1.0 是最大音量
          beepSound.play();
       }

      }
}