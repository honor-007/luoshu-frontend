import {log} from "@/utils/prettyLog";
import {allMenuCodeArray} from "@/services/system/menu/api";

export default (initialState: { userMenuCodes: string[], allMenuCodes: string[] } | undefined) => {

    const {userMenuCodes,allMenuCodes} = initialState ?? {};

    // let result: { [key:string]:any } = {'a':'ss'};
    let result: Record<string, boolean | undefined> = {};

    allMenuCodes?.forEach(value => {
        result[value] = userMenuCodes?.includes(value) ?? false;
    });

    log.info('权限校验结果:')
    console.log("access", result);

    return result;
};
