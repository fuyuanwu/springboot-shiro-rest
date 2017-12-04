package com.pobo.filter;

import com.alibaba.fastjson.JSONObject;
import com.pobo.domain.Result;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.http.MediaType;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录过滤器
 */
@WebFilter(urlPatterns = "/*")
public class LoginFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String requestURI = WebUtils.toHttp(servletRequest).getRequestURI();
        if (requestURI != null && requestURI.startsWith("/login")) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else if (SecurityUtils.getSubject().isAuthenticated()) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            // 添加编码
            ((HttpServletResponse) servletResponse).setHeader("Content-Type", MediaType.APPLICATION_JSON_UTF8_VALUE);
            servletResponse.getWriter().write(JSONObject.toJSONString(Result.ofFailure(405, "请登陆")));
        }
    }

    @Override
    public void destroy() {

    }
}