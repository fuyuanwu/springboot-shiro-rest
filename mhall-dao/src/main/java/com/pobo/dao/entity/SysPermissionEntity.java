package com.pobo.dao.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "t_sys_permission", schema = "pobo_mhall", catalog = "")
public class SysPermissionEntity implements Serializable {
    private int id;//主键.
    private String name;//名称.
    private String resourceType;//资源类型，[menu|button]
    private String url;//资源路径.
    private String permission; //权限字符串,menu例子：role:*，button例子：role:create,role:update,role:delete,role:view
    private int parentId; //父编号
    private String parentIds; //父编号列表
    private boolean available = Boolean.FALSE;
    private List<SysRoleEntity> roles;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(columnDefinition = "enum('menu','button')")
    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public String getParentIds() {
        return parentIds;
    }

    public void setParentIds(String parentIds) {
        this.parentIds = parentIds;
    }

    @Type(type = "true_false")
    public boolean getAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    @ManyToMany
    @JoinTable(name = "t_sys_role_permission", joinColumns = {@JoinColumn(name = "permission_id")}, inverseJoinColumns = {@JoinColumn(name = "role_id")})
    public List<SysRoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(List<SysRoleEntity> roles) {
        this.roles = roles;
    }
}