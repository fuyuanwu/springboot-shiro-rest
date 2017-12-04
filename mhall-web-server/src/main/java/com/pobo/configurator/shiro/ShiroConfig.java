package com.pobo.configurator.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiroConfig {
    @Bean
    public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
        System.out.println("ShiroConfiguration.shirFilter()");
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);

        return shiroFilterFactoryBean;
    }

    @Bean
    public AuthorizingRealm initAuthorizingRealm() {
        AuthorizingRealm authorizingRealm = new ShiroRealm();
        authorizingRealm.setCredentialsMatcher(initCredentialsMatcher());
        return authorizingRealm;
    }

    @Bean
    public CredentialsMatcher initCredentialsMatcher() {
        return new HashedCredentialsMatcher() {
            @Override
            public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
                SimpleAuthenticationInfo simpleAuthenticationInfo = (SimpleAuthenticationInfo) info;
                UsernamePasswordToken utoken = (UsernamePasswordToken) token;

                //获得用户输入的密码:(可以采用加盐(salt)的方式去检验)
                String inPassword = new String(utoken.getPassword());
                String encryptPassword = PasswordHelper.encryptPassword(inPassword, simpleAuthenticationInfo.getCredentialsSalt());

                //获得数据库中的密码
                String dbPassword = (String) info.getCredentials();

                //进行密码的比对
                return this.equals(encryptPassword, dbPassword);
            }
        };
    }

    @Bean
    public SecurityManager initSecurityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(initAuthorizingRealm());
        return securityManager;
    }
}