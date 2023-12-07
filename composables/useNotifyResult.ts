export function useNotifyResult(data:any) {
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
      }
}