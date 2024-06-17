// @ts-ignore
/* eslint-disable */

declare namespace API {

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

    interface PageInfo_UserInfo_ {
        /**
         1 */
        current?: number;
        pageSize?: number;
        total?: number;
        list?: Array<UserInfo>;
    }

    interface Result_PageInfo_UserInfo__ {
        success?: boolean;
        errorMessage?: string;
        data?: PageInfo_UserInfo_;
    }

    interface Result_UserInfo_ {
        success?: boolean;
        errorMessage?: string;
        data?: UserInfo;
    }

    interface Result_string_ {
        success?: boolean;
        errorMessage?: string;
        data?: string;
    }

    type UserGenderEnum = 'MALE' | 'FEMALE';

    interface UserInfo {
        id?: string;
        name?: string;
        /** nick */
        nickName?: string;
        /** email */
        email?: string;
        gender?: UserGenderEnum;
    }

    interface UserInfoVO {
        name?: string;
        /** nick */
        nickName?: string;
        /** email */
        email?: string;
    }


    type Result<T> = {
        code?: string;
        success?: boolean;
        data?: T;
        msg?: string;
        status?: string;
        type?: string;
    };

    type PageInfo<T> = {
        /**
         1 */
        current?: number;
        pageSize?: number;
        total?: number;
        records?: Array<T>;
        deptId?: string;
    }
}
