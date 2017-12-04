package com.pobo.exception;

import com.pobo.domain.Result;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;

/**
 * 异常处理
 */
@RestController
@CrossOrigin
@ControllerAdvice
class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    Object exception(HttpServletRequest req, Exception e) {
        logger.error("系统错误: [{}]", ExceptionUtil.getExceptionStackTrace(e));
        return Result.ofFailure(500, "系统错误");
    }

    @ExceptionHandler(value = NoHandlerFoundException.class)
    @ResponseBody
    Object noHandlerFoundException(HttpServletRequest req, NoHandlerFoundException e) {
        return Result.ofFailure(404, "找不到请求路径");
    }

    @ExceptionHandler(value = IncorrectCredentialsException.class)
    @ResponseBody
    Object incorrectCredentialsException(HttpServletRequest req, IncorrectCredentialsException e) {
        return Result.ofFailure(405, "用户名或密码错误");
    }

    @ExceptionHandler(value = LockedAccountException.class)
    @ResponseBody
    Object lockedAccountException(HttpServletRequest req, LockedAccountException e) {
        return Result.ofFailure(405, "登录失败，该用户已被冻结");
    }

    @ExceptionHandler(value = AuthenticationException.class)
    @ResponseBody
    Object authenticationException(HttpServletRequest req, AuthenticationException e) {
        return Result.ofFailure(405, "用户名或密码错误");
    }

}