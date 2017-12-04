package com.pobo.dao.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "t_user", schema = "pobo_mhall", catalog = "")
public class UserEntity implements Serializable {
    private int id;
    private String loginName;//帐号
    private String name;//名称（昵称或者真实姓名，不同系统不同定义）
    private String password; //密码;
    private String salt;//加密密码的盐
    private int state;//用户状态,0:创建未认证（比如没有激活，没有输入验证码等等）--等待验证的用户 , 1:正常状态,2：用户被锁定.
    private List<SysRoleEntity> roleList;// 一个用户具有多个角色

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(unique = true)
    public String getLoginName() {
        return this.loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    @ManyToMany(fetch = FetchType.EAGER)//立即从数据库中进行加载数据;
    @JoinTable(name = "t_sys_user_role", joinColumns = {@JoinColumn(name = "id")}, inverseJoinColumns = {@JoinColumn(name = "role_id")})
    public List<SysRoleEntity> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<SysRoleEntity> roleList) {
        this.roleList = roleList;
    }

    /**
     * 密码盐.
     */
    @Transient
    public String getCredentialsSalt() {
        return this.loginName + this.salt;
    }
    //重新对盐重新进行了定义，用户名+salt，这样就更加不容易被破解
}