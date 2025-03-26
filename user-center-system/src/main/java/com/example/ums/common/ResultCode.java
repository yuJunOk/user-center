package com.example.ums.common;

import lombok.Getter;

/**对服务响应信息枚举类
 *
 * @email: pengyujun53@163.com
 * @author: peng_YuJun
 * @date: 2022/9/18
 * @time: 9:47
 */
@Getter
public enum ResultCode {
    /**
     *
     */
    PARAMS_ERROR("请求参数错误", 40000),
    /**
     *
     */
    NOT_LOGIN("未登录", 40100),
    /**
     *
     */
    NO_AUTH("无权限", 40101),
    /**
     *
     */
    ERROR("系统内部异常", 50000),
    /**
     *
     */
    FAIL("fail", 0),
    /**
     *
     */
    SUCCESS("ok", 0);

    private final String message;
    private final int code;

    ResultCode(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
