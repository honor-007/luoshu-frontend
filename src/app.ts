// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import type {RequestOptions} from '@@/plugin-request/request';
import {RequestConfig, history} from "@umijs/max";
import {message, notification} from "antd";
import {log} from "@/utils/prettyLog";
import {getToken} from "@/utils/storage.utils";
import {currentUser, login} from "@/services/user/api";
import {allMenuCodeArray, userMenuCodeArray} from "@/services/system/menu/api";
import {useIntl} from "react-intl";
import {requestConfig} from "@/requestConfig";

const loginPath = '/login';

export async function getInitialState(): Promise<{
    fetchLogin?: (values: API.LoginParams) => Promise<API.CurrentUser | undefined>;
    currentUser?: API.CurrentUser;
    userMenuCodes?: string[];
    allMenuCodes?: string[];
}> {
    const fetchLogin = async (values: API.LoginParams) => {
        try {
            const result = await login(values);
            if (result.success) {
                return result.data;
            }
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };

    // 如果不是登录页面，执行(应对登陆后刷新的情况)
    const {location} = history;
    if (location.pathname !== loginPath) {
        const currentUserResult = await currentUser();
        const menuCodeArrayResult = await userMenuCodeArray();
        const allMenuCodeArrayResult = await allMenuCodeArray();
        return {
            fetchLogin,
            currentUser: currentUserResult.data,
            userMenuCodes: menuCodeArrayResult.data,
            allMenuCodes: allMenuCodeArrayResult.data,
        };
    }

    log.info("执行了getInitialState方法",)
    return {
        fetchLogin,
    };
}

// export const layout = () => {
//     return {
//         logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//         menu: {
//             locale: false,
//         },
//     };
// };


// 错误处理方案： 错误类型
enum ErrorShowType {
    SILENT = 0,
    WARN_MESSAGE = 1,
    ERROR_MESSAGE = 2,
    NOTIFICATION = 3,
    REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
    success: boolean;
    data: any;
    code?: number;
    msg?: string;
    showType?: ErrorShowType;
}

// 运行时配置
export const request: RequestConfig = {
    ...requestConfig,
};