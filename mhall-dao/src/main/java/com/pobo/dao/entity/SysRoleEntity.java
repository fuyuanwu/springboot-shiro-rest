package com.pobo.dao.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "t_sys_role", schema = "pobo_mhall", catalog = "")
public class SysRoleEntity implements Serializable {
    private Integer id; // 编号
    private String role; // 角色标识程序中判断使用,如"admin",这个是唯一的:
    private String description; // 角色描述,UI界面显示使用
    private boolean available = Boolean.FALSE; // 是否可用,如果不可用将不会添加给用户
    private List<SysPermissionEntity> permissions;
    private List<UserEntity> userList;// 一个角色对应多个用户

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Type(type = "true_false")
    public boolean getAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    //角色 -- 权限关系：多对多关系;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "t_sys_role_permission", joinColumns = {@JoinColumn(name = "role_id")}, inverseJoinColumns = {@JoinColumn(name = "permission_id")})
    public List<SysPermissionEntity> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<SysPermissionEntity> permissions) {
        this.permissions = permissions;
    }

    // 用户 - 角色关系定义;
    @ManyToMany
    @JoinTable(name = "t_sys_user_role", joinColumns = {@JoinColumn(name = "role_id")}, inverseJoinColumns = {@JoinColumn(name = "id")})
    public List<UserEntity> getUsers() {
        return userList;
    }

    public void setUsers(List<UserEntity> userInfos) {
        this.userList = userInfos;
    }
}