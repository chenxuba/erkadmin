import request from '@/utils/request'

// 获取腾讯云视频上传签名
export function getsign(data) {
  return request({
    url: "/sign",
    method: 'post',
    data
  })
}