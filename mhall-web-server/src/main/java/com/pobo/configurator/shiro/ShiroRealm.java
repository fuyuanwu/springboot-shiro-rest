package com.pobo.configurator.shiro;

import com.pobo.dao.entity.SysPermissionEntity;
import com.pobo.dao.entity.SysRoleEntity;
import com.pobo.dao.entity.UserEntity;
import com.pobo.dao.repository.UserRepository;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ShiroRealm extends AuthorizingRealm {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserRepository userRepository;

    /**
     * 提供用户信息返回权限信息
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        System.out.println("权限配置-->ShiroRealm.doGetAuthorizationInfo()");
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();

        UserEntity userInfo = (UserEntity) principals.getPrimaryPrincipal();

        for (SysRoleEntity role : userInfo.getRoleList()) {
            // 将角色名称提供给info
            authorizationInfo.addRole(role.getRole());
            for (SysPermissionEntity p : role.getPermissions()) {
                // 将权限名称提供给info
                authorizationInfo.addStringPermission(p.getPermission());
            }
        }

        return authorizationInfo;
    }

    /**
     * 提供账户信息返回认证信息
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
            throws AuthenticationException {
        String username = (String) token.getPrincipal();
        UserEntity user = userRepository.findByLoginName(username);
        if (user == null) {
            // 用户名不存在抛出异常
            throw new UnknownAccountException();
        }

        // 用户状态不对
        if (user.getState() != 1) {
            // 用户被管理员锁定抛出异常
            throw new LockedAccountException();
        }

        return new SimpleAuthenticationInfo(user.getLoginName(), user.getPassword(), ByteSource.Util.bytes(user.getCredentialsSalt()), getName());
    }
}