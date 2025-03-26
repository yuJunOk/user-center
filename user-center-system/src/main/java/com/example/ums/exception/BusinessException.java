package com.example.ums.exception;

import com.example.ums.common.ResultCode;
import lombok.Getter;

/**
 * 自定义异常类
 *
 * @author pengYuJun
 */
@Getter
public class BusinessException extends RuntimeException {

    private final int code;

    private final String message;

    private final String details;

    public BusinessException(String message, int code, String details) {
        super(message);
        this.code = code;
        this.message = message;
        this.details = details;
    }

    public BusinessException(ResultCode resultCode) {
        super(resultCode.getMessage());
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.details = null;
    }

    public BusinessException(ResultCode resultCode, String details) {
        super(resultCode.getMessage());
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.details = details;
    }
}
