import httpRequest from "./api";

// 定义接口的传参

// 获取用户信息
export function apiGetUserInfo(param) {

  console.log(param)
  return httpRequest({
    method: "post",
    data: param,
  });
}
