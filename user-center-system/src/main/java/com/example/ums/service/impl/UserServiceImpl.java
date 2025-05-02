package com.example.ums.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.ums.common.ResponseCode;
import com.example.ums.exception.BusinessException;
import com.example.ums.mapper.UserMapper;
import com.example.ums.pojo.domain.UserDo;
import com.example.ums.pojo.dto.user.UserQueryPageDto;
import com.example.ums.pojo.vo.UserVo;
import com.example.ums.service.UserService;
import com.example.ums.utils.CommonUtils;
import com.example.ums.utils.MailUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.example.ums.constant.UserConstant.*;

/**
* @author pengYuJun
* @description 针对表【tb_user(用户表)】的数据库操作Service实现
* @createDate 2025-03-21 10:LOGIN_NAME_MIN_LEN6:02
*/
@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, UserDo>
        implements UserService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private MailUtils mailUtils;

    @Override
    public long userRegister(String loginName, String loginPwd, String checkPwd, String email, String captcha, HttpServletRequest request) {
        // 1. 校验
        if (CommonUtils.isAnyBlank(loginName, loginPwd, checkPwd)) {
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "参数为空");
        }
        if (loginName.length() < LOGIN_NAME_MIN_LEN){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "用户账号过短");
        }
        if (loginPwd.length() < LOGIN_PWD_MIN_LEN){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "用户密码过短");
        }
        // 账户不能包含特殊字符
        Matcher matcher = Pattern.compile(VALID_LOGIN_NAME_PATTERN).matcher(loginName);
        if (matcher.find()){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "账户不能包含特殊字符");
        }
        // 密码与校验密码相同
        if (!loginPwd.equals(checkPwd)){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "密码与校验密码相同");
        }
        // 校验验证码
        String captchaOg = (String) request.getSession().getAttribute("captcha");
        if (!StringUtils.hasText(captcha)){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "验证码已失效，请重新获取");
        }
        if (!captcha.equals(captchaOg)){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "验证码不匹配，请重新输入");
        }
        request.getSession().removeAttribute("captcha");
        // 账户不能重复
        LambdaQueryWrapper<UserDo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserDo::getLoginName, loginName);
        long count = this.count(queryWrapper);
        if (count > 0){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "账户不能重复");
        }
        // 邮箱不能重复
        queryWrapper.clear();
        queryWrapper.eq(UserDo::getEmail, email);
        count = this.count(queryWrapper);
        if (count > 0){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "邮箱不能重复");
        }
        // 2. 加密
        String md5Pwd = DigestUtils.md5DigestAsHex((PASSWORD_SALT + loginPwd).getBytes());
        // 3. 插入数据
        UserDo userDo = new UserDo();
        userDo.setLoginName(loginName);
        userDo.setLoginPwd(md5Pwd);
        userDo.setEmail(email);
        boolean saveResult = this.save(userDo);
        if (!saveResult){
            throw new BusinessException(ResponseCode.ERROR, "注册失败");
        }
        return userDo.getId();
    }

    @Override
    public UserVo userLogin(String loginName, String loginPwd, HttpServletRequest request) {
        // 1. 校验
        if (CommonUtils.isAnyBlank(loginName, loginPwd)) {
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "参数为空");
        }
        if (loginName.length() < LOGIN_NAME_MIN_LEN){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "用户账号过短");
        }
        if (loginPwd.length() < LOGIN_PWD_MIN_LEN){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "用户密码过短");
        }
        // 账户不能包含特殊字符
        Matcher matcher = Pattern.compile(VALID_LOGIN_NAME_PATTERN).matcher(loginName);
        if (matcher.find()){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "账户不能包含特殊字符");
        }
        // 2. 加密
        String md5Pwd = DigestUtils.md5DigestAsHex((PASSWORD_SALT + loginPwd).getBytes());
        // 查询用户信息
        LambdaQueryWrapper<UserDo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserDo::getLoginName, loginName);
        queryWrapper.eq(UserDo::getLoginPwd, md5Pwd);
        UserDo userDo = this.getOne(queryWrapper);
        if (userDo == null){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "登录失败，账户或密码错误");
        }
        // 3.用户脱敏
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(userDo, userVo);
        // LOGIN_NAME_MIN_LEN. 记录用户的登录态
        request.getSession().setAttribute(USER_LOGIN_STATE, userVo);
        return userVo;
    }

    @Override
    public int userLogout(HttpServletRequest request) {
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return 1;
    }

    @Override
    public IPage<UserVo> searchUser(UserQueryPageDto userQueryPageDto) {
        IPage<UserVo> userPage = new Page<>(userQueryPageDto.getCurrent(), userQueryPageDto.getPageSize());
        // 筛选
        LambdaQueryWrapper<UserDo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(StringUtils.hasText(userQueryPageDto.getUserName()), UserDo::getUserName, userQueryPageDto.getUserName());
        queryWrapper.like(StringUtils.hasText(userQueryPageDto.getLoginName()), UserDo::getLoginName, userQueryPageDto.getLoginName());
        queryWrapper.eq(userQueryPageDto.getGender() != null, UserDo::getGender, userQueryPageDto.getGender());
        queryWrapper.like(StringUtils.hasText(userQueryPageDto.getPhone()), UserDo::getPhone, userQueryPageDto.getPhone());
        queryWrapper.like(StringUtils.hasText(userQueryPageDto.getEmail()), UserDo::getEmail, userQueryPageDto.getEmail());
        queryWrapper.eq(userQueryPageDto.getStatus() != null, UserDo::getStatus, userQueryPageDto.getStatus());
        queryWrapper.eq(userQueryPageDto.getUserRole() != null, UserDo::getUserRole, userQueryPageDto.getUserRole());
        // 逻辑删除不要查出来
        queryWrapper.eq(UserDo::getDeleted, 0);
        //
        userMapper.selectUserVoPage(userPage, queryWrapper);
        //若当前页码大于总页面数
        if (userQueryPageDto.getCurrent() > userPage.getPages()){
            userPage = new Page<>(userPage.getPages(), userQueryPageDto.getPageSize());
            userMapper.selectUserVoPage(userPage, queryWrapper);
        }
        return userPage;
    }

    @Override
    public String getMailCaptcha(String email, HttpServletRequest request) {
        if (!StringUtils.hasText(email)) {
            return null;
        }
        // 随机生成6为随机数
        String captcha = (Math.random() + "").substring(2, LOGIN_PWD_MIN_LEN);
        boolean result = mailUtils.sendCaptchaMail(captcha, email);
        if (result) {
            return captcha;
        }else {
            return null;
        }
    }

    @Override
    public boolean addUser(UserDo userDo) {
        // 1. 校验
        if (CommonUtils.isAnyBlank(userDo.getLoginName(), userDo.getLoginPwd())) {
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "账户和密码不能为空");
        }
        if (userDo.getLoginName().length() < LOGIN_NAME_MIN_LEN){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "用户账号过短");
        }
        if (userDo.getLoginPwd().length() < LOGIN_PWD_MIN_LEN){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "用户密码过短");
        }
        // 账户不能包含特殊字符
        Matcher matcher = Pattern.compile(VALID_LOGIN_NAME_PATTERN).matcher(userDo.getLoginName());
        if (matcher.find()){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "账户不能包含特殊字符");
        }
        // 账户不能重复
        LambdaQueryWrapper<UserDo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserDo::getLoginName, userDo.getLoginName());
        long count = this.count(queryWrapper);
        if (count > 0){
            throw new BusinessException(ResponseCode.PARAMS_ERROR, "账户不能重复");
        }
        // 2. 加密
        String md5Pwd = DigestUtils.md5DigestAsHex((PASSWORD_SALT + userDo.getLoginPwd()).getBytes());
        userDo.setLoginPwd(md5Pwd);
        // 3.插入
        return this.save(userDo);
    }
}




