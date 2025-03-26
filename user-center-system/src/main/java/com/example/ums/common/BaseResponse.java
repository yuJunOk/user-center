package com.example.ums.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serial;
import java.io.Serializable;

/**
 * 调用返回类
 * @author pengYuJun
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class BaseResponse<T> implements Serializable {
    @Serial
    private static final long serialVersionUID = -3461717234455860399L;

    private int code;

    private T data;

    private String message;

    private String details;

    public BaseResponse(ResultCode resultCode) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
    }
}
