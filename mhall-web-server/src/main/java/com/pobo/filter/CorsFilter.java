package com.pobo.filter;

import org.apache.shiro.web.util.WebUtils;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsProcessor;
import org.springframework.web.cors.DefaultCorsProcessor;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 跨域过滤器
 */
@WebFilter(urlPatterns = "/*")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {
    private CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
    private CorsProcessor corsProcessor = new DefaultCorsProcessor();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 添加跨域
        corsProcessor.processRequest(corsConfiguration, (HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse);

        if (!WebUtils.toHttp(servletRequest).getMethod().equals(HttpMethod.OPTIONS.name())) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            WebUtils.toHttp(servletResponse).getWriter().close();
        }
    }

    @Override
    public void destroy() {

    }
}