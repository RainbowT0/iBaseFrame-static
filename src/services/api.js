import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

// -------------------- 用户管理 begin-------------------------
// 删除
export async function removeRule(params) {
  return request(`/base/app-user/delete/${params}`, {
    method: 'DELETE'
  });
}

// 批量删除
export async function removeRules(params){
  return request('/base/app-user/deletes',{
    method:'POST',
    data:{
      ...params
    }
  })
}

// 列表
export async function getUserList(params){
  return request(`/base/app-user/page?${stringify(params)}`)
}

// 添加
export async function addRule(params) {
  return request('/base/app-user/add', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

// 锁定
export async function isLock(params){
  return request(`/base/app-user/lock/${stringify(params)}`,{
    method:'POST',
    data:{...params}
  })
}

// 编辑
export async function updateRule(params = {}) {
  return request(`/base/app-user/edit`, {
    method: 'PUT',
    data: {
      ...params
    },
  });
}
// -------------------- 用户管理 end-------------------------


// -------------------自定义档案定义 begin-------------------------
// 列表
export async function getDefinList(params){
  return request(`/base/bd-defdoc/page?${stringify(params)}`)
}
// -------------------自定义档案定义 end-------------------------


export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
