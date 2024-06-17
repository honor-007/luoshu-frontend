// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 前端菜单数据 GET /api/system/menu/routes */
export async function routers() {
    return request<{
        data: any;
    }>('/api/system/menu/routes', {
        method: 'GET',
    });
}

/** 获取当前用户的菜单 */
export async function userMenuCodeArray() {
    return request<API.Result<string[]>>('/api/system/menu/user-menu-codes', {
        method: 'GET',
    });
}

/** 获取系统的所有菜单 GET /api/system/menu/catalog-codes */
export async function allMenuCodeArray() {
    return request<API.Result<string[]>>('/api/system/menu/all-menu-codes', {
        method: 'GET',
    });
}
