package com.example.ums.service;

import com.example.ums.model.domain.User;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

import static com.example.ums.constant.UserConstant.PASSWORD_SALT;

@SpringBootTest
public class UserServiceTest {

    @Resource
    private UserService userService;

    @Test
    public void save(){
        User user = new User();
        user.setUserName("dogYupi");
        user.setLoginName("12345678");
        user.setAvatarUrl("https://pic.code-nav.cn/user_avatar/1601072287388278786/thumbnail/66mwv6CDAmxwVfNi.jpeg");
        user.setGender(0);
        user.setLoginPwd(DigestUtils.md5DigestAsHex((PASSWORD_SALT + "12345678").getBytes()));
        user.setPhone("123");
        user.setEmail("456");
        userService.save(user);
    }

}