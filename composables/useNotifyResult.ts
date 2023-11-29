export function useNotifyResult(data:any) {
    if(data.msgType==='newItem'){
        console.log(data.msg)
        if(data.msg.inventory_result==='正常')
        {
          ElMessage({
            message: data.msg.location_number + ' : ' + '正常',
            type: 'success',
          })
        }else if(data.msg.inventory_result==='异常'){
          if(data.msg.remarks==='有货无码')
          {
            ElMessage({
              message: data.msg.location_number + ' : ' + '异常:有货无码',
              type: 'warning',
            })
          }else if(data.msg.remarks==='无货无码'){
            ElMessage({
              message: data.msg.location_number + ' : ' + '异常:无货无码',
              type: 'warning',
            })
          }
          else{
            ElMessage.error('其他错误')
          }
        }
        else{
            ElMessage.error('其他错误')
        }
      }
}