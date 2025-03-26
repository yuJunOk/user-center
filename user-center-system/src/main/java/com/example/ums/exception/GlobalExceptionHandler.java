package com.example.ums.exception;

import com.example.ums.common.BaseResponse;
import com.example.ums.common.ResultCode;
import com.example.ums.common.ResponseUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author pengYuJun
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * 业务异常处理
     * @param e 业务异常
     * @return
     */
    @ExceptionHandler(BusinessException.class)
    public BaseResponse<Object> businessExceptionHandler(BusinessException e) {
        log.error("businessException", e);
        return ResponseUtils.error(e.getCode(), e.getMessage(), e.getDetails());
    }

    /**
     * 运行异常处理
     * @param e 运行异常
     * @return
     */
    @ExceptionHandler(RuntimeException.class)
    public BaseResponse runtimeExceptionHandler(RuntimeException e) {
        log.error("runtimeException", e);
        return ResponseUtils.error(ResultCode.ERROR, e.getMessage());
    }
}
