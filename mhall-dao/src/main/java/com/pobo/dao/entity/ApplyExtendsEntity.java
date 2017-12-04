package com.pobo.dao.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "t_apply_extends", schema = "pobo_mhall", catalog = "")
public class ApplyExtendsEntity {
    private int id;
    private int applyDefineId;
    private String applyId;
    private String key;
    private String value;
    private Timestamp createTime;
    private Timestamp updateTime;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "apply_define_id", nullable = false)
    public int getApplyDefineId() {
        return applyDefineId;
    }

    public void setApplyDefineId(int applyDefineId) {
        this.applyDefineId = applyDefineId;
    }

    @Basic
    @Column(name = "apply_id", nullable = false, length = 45)
    public String getApplyId() {
        return applyId;
    }

    public void setApplyId(String applyId) {
        this.applyId = applyId;
    }

    @Basic
    @Column(name = "key", nullable = false, length = 45)
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Basic
    @Column(name = "value", nullable = true, length = 200)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Basic
    @Column(name = "create_time", nullable = true)
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "update_time", nullable = true)
    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ApplyExtendsEntity that = (ApplyExtendsEntity) o;

        if (id != that.id) return false;
        if (applyDefineId != that.applyDefineId) return false;
        if (applyId != null ? !applyId.equals(that.applyId) : that.applyId != null) return false;
        if (key != null ? !key.equals(that.key) : that.key != null) return false;
        if (value != null ? !value.equals(that.value) : that.value != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;
        if (updateTime != null ? !updateTime.equals(that.updateTime) : that.updateTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + applyDefineId;
        result = 31 * result + (applyId != null ? applyId.hashCode() : 0);
        result = 31 * result + (key != null ? key.hashCode() : 0);
        result = 31 * result + (value != null ? value.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
    }
}
