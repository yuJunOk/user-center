package com.example.ums.common;

/**
 * @author pengYuJun
 */
public class ResponseUtils {

    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<T>(ResultCode.SUCCESS).setData(data);
    }

    public static <T> BaseResponse<T> fail(T data) {
        return new BaseResponse<T>(ResultCode.FAIL).setData(data);
    }

    public static <T> BaseResponse<T> fail(T data, String details) {
        return new BaseResponse<T>(ResultCode.FAIL).setData(data).setDetails(details);
    }

    public static BaseResponse error(ResultCode errorCode) {
        return new BaseResponse<>(errorCode);
    }

    public static BaseResponse error(int code, String message, String details) {
        return new BaseResponse<>(code, null, message, details);
    }

    public static BaseResponse error(ResultCode errorCode, String message, String details) {
        return new BaseResponse<>(errorCode).setMessage(message).setDetails(details);
    }

    public static BaseResponse error(ResultCode errorCode, String details) {
        return new BaseResponse<>(errorCode).setDetails(details);
    }
}
