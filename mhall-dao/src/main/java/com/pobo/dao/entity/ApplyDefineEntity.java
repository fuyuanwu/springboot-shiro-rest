package com.pobo.dao.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "t_apply_define", schema = "pobo_mhall", catalog = "")
public class ApplyDefineEntity {
    private int id;
    private String defineName;
    private String defineCode;
    private String funtionList;
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
    @Column(name = "define_name", nullable = false, length = 45)
    public String getDefineName() {
        return defineName;
    }

    public void setDefineName(String defineName) {
        this.defineName = defineName;
    }

    @Basic
    @Column(name = "define_code", nullable = false, length = 45)
    public String getDefineCode() {
        return defineCode;
    }

    public void setDefineCode(String defineCode) {
        this.defineCode = defineCode;
    }

    @Basic
    @Column(name = "funtion_list", nullable = true, length = 45)
    public String getFuntionList() {
        return funtionList;
    }

    public void setFuntionList(String funtionList) {
        this.funtionList = funtionList;
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

        ApplyDefineEntity that = (ApplyDefineEntity) o;

        if (id != that.id) return false;
        if (defineName != null ? !defineName.equals(that.defineName) : that.defineName != null) return false;
        if (defineCode != null ? !defineCode.equals(that.defineCode) : that.defineCode != null) return false;
        if (funtionList != null ? !funtionList.equals(that.funtionList) : that.funtionList != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;
        if (updateTime != null ? !updateTime.equals(that.updateTime) : that.updateTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (defineName != null ? defineName.hashCode() : 0);
        result = 31 * result + (defineCode != null ? defineCode.hashCode() : 0);
        result = 31 * result + (funtionList != null ? funtionList.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
    }
}
