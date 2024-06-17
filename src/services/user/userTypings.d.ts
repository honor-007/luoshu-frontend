// @ts-ignore
/* eslint-disable */

declare namespace API {
    type LoginResult = {
        status?: string;
        type?: string;
        currentAuthority?: string;
    };

    type PageParams = {
        current?: number;
        pageSize?: number;
    };

    type RuleListItem = {
        key?: number;
        disabled?: boolean;
        href?: string;
        avatar?: string;
        name?: string;
        owner?: string;
        desc?: string;
        callNo?: number;
        status?: number;
        updatedAt?: string;
        createdAt?: string;
        progress?: number;
    };

    type RuleList = {
        data?: RuleListItem[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
    };

    type FakeCaptcha = {
        code?: number;
        status?: string;
    };

    type LoginParams = {
        username?: string;
        password?: string;
        tenantId?: string;
        autoLogin?: boolean;
        type?: string;
    };

    type ErrorResponse = {
        /** 业务约定的错误码 */
        errorCode: string;
        /** 业务上的错误信息 */
        errorMessage?: string;
        /** 业务上的请求是否成功 */
        success?: boolean;
    };

    type NoticeIconList = {
        data?: NoticeIconItem[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
    };

    type NoticeIconItemType = 'notification' | 'message' | 'event';

    type NoticeIconItem = {
        id?: string;
        extra?: string;
        key?: string;
        read?: boolean;
        avatar?: string;
        title?: string;
        status?: string;
        datetime?: string;
        description?: string;
        type?: NoticeIconItemType;
    };


    type CurrentUser = {
        /**
         * 令牌类型
         */
        tokenType?: string;
        /**
         * 令牌
         */
        accessToken?: string;
        /**
         * 头像
         */
        avatar?: string;
        /**
         * 用户ID
         */
        userid?: string;
        /**
         * 角色名
         */
        authority?: string;

        /**
         * 用户名
         */
        userName?: string;
        /**
         * 账号名
         */
        account?: string;
        email?: string;
    };

    type User = {
        id?: string;

        /**
         * 编号
         */
        code?: string;
        /**
         * 账号
         */
        account?: string;
        /**
         * 密码
         */
        password?: string;
        /**
         * 昵称
         */
        name?: string;
        /**
         * 真名
         */
        realName?: string;
        /**
         * 头像
         */
        avatar?: string;
        /**
         * 邮箱
         */
        email?: string;
        /**
         * 手机
         */
        phone?: string;
        /**
         * 生日
         */
        birthday?: string;
        /**
         * 性别
         */
        sex?: string;
        /**
         * 角色id
         */
        roleId?: string;
        /**
         * 部门id
         */
        deptId?: string;
        /**
         * 部门id
         */
        postId?: string;
    };
}
