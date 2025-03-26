package com.example.ums;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author pengYuJun
 */
@MapperScan("com.example.ums.mapper")
@SpringBootApplication
public class UserManageSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserManageSystemApplication.class, args);
    }

}
