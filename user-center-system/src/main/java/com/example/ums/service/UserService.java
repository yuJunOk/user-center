package com.example.ums.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.ums.pojo.domain.UserDo;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.ums.pojo.dto.PageDto;
import com.example.ums.pojo.dto.UserDto;
import com.example.ums.pojo.vo.UserVo;
import jakarta.servlet.http.HttpServletRequest;

/**
* @author pengYuJun
* @description 针对表【tb_user(用户表)】的数据库操作Service
* @createDate 2025-03-21 10:46:02
*/
public interface UserService extends IService<UserDo> {

    /**
     * 用户注册
     *
     * @param loginName 用户账户
     * @param loginPwd 用户密码
     * @param checkPwd 校验密码
     * @return 新用户id
     */
    long userRegister(String loginName, String loginPwd, String checkPwd, String email, String captcha, HttpServletRequest request);

    /**
     * 用户登录
     *
     * @param loginName 用户账号
     * @param loginPwd 用户密码
     * @return 用户信息
     */
    UserVo userLogin(String loginName, String loginPwd, HttpServletRequest request);

    /**
     * 用户注销
     * @param request
     * @return
     */
    int userLogout(HttpServletRequest request);

    /**
     * 分页查询
     * @param userDto
     * @param pageDto
     * @return
     */
    IPage<UserVo> searchUser(UserDto userDto, PageDto pageDto);

    /**
     *
     * @param email
     * @param request
     */
    String getMailCaptcha(String email, HttpServletRequest request);

    /**
     * 添加用户
     * @param userDo
     * @return
     */
    boolean addUser(UserDo userDo);
}
