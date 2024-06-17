// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 前端菜单数据 GET /api/system/menu/routes */
export async function tree() {
    return request<API.Result<API.TreeNode>>('/api/system/dept/tree', {
        method: 'GET',
    });
}
