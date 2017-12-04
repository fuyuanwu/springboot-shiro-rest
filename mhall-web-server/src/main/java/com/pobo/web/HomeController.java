package com.pobo.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pobo.exception.ExceptionUtil;
import com.pobo.service.BasicInfoService;
import com.pobo.domain.LoginUser;
import com.pobo.domain.Result;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/")
@CrossOrigin
public class HomeController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private ObjectMapper MAPPER = new ObjectMapper();
    @Autowired
    BasicInfoService basicInfoService;

    /**
     * 登录
     *
     * @param loginUserDomain
     * @param request
     * @return
     */
    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    Object login(@RequestBody LoginUser loginUserDomain, HttpServletRequest request) {
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(loginUserDomain.getUsername(),
                loginUserDomain.getPassword(), request.getRemoteHost());
        try {
            SecurityUtils.getSubject().login(usernamePasswordToken);
        } catch (IncorrectCredentialsException e) {
            logger.error("用户名或密码错误", 405);
            return Result.ofFailure(405, "用户名或密码错误");
        } catch (LockedAccountException e) {
            logger.error("登录失败，该用户已被冻结", 405);
            return Result.ofFailure(405, "登录失败，该用户已被冻结");
        } catch (AuthenticationException e) {
            logger.error("用户名或密码错误", 405);
            return Result.ofFailure(405, "用户名或密码错误");
        } catch (Exception e) {
            logger.error("登录失败: [{}]", ExceptionUtil.getExceptionStackTrace(e));
            return Result.ofFailure(405, "用户名或密码错误");
        }

        return Result.ofSuccess();
    }

    /**
     * 登出
     *
     * @return
     */
    @GetMapping(path = "/logout")
    Object logout() {
        SecurityUtils.getSubject().logout();
        return Result.ofSuccess();
    }
}
