package com.pobo.dao.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "t_apply", schema = "pobo_mhall", catalog = "")
public class ApplyEntity {
    private int id;
    private int applyDefineInstanceId;
    private String applyName;
    private String applyCode;
    private String userName;
    private String userCardId;
    private String userPhoneNum;
    private String extendsJson;
    private String auditResult;
    private String dealResult;
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
    @Column(name = "apply_define_instance_id", nullable = false)
    public int getApplyDefineInstanceId() {
        return applyDefineInstanceId;
    }

    public void setApplyDefineInstanceId(int applyDefineInstanceId) {
        this.applyDefineInstanceId = applyDefineInstanceId;
    }

    @Basic
    @Column(name = "apply_name", nullable = false, length = 45)
    public String getApplyName() {
        return applyName;
    }

    public void setApplyName(String applyName) {
        this.applyName = applyName;
    }

    @Basic
    @Column(name = "apply_code", nullable = false, length = 45)
    public String getApplyCode() {
        return applyCode;
    }

    public void setApplyCode(String applyCode) {
        this.applyCode = applyCode;
    }

    @Basic
    @Column(name = "user_name", nullable = true, length = 100)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "user_card_id", nullable = true, length = 18)
    public String getUserCardId() {
        return userCardId;
    }

    public void setUserCardId(String userCardId) {
        this.userCardId = userCardId;
    }

    @Basic
    @Column(name = "user_phone_num", nullable = true, length = 20)
    public String getUserPhoneNum() {
        return userPhoneNum;
    }

    public void setUserPhoneNum(String userPhoneNum) {
        this.userPhoneNum = userPhoneNum;
    }

    @Basic
    @Lob
    @Column(name = "extends_json", nullable = true, length = -1)
    public String getExtendsJson() {
        return extendsJson;
    }

    public void setExtendsJson(String extendsJson) {
        this.extendsJson = extendsJson;
    }

    @Basic
    @Column(name = "audit_result", nullable = true, length = 45)
    public String getAuditResult() {
        return auditResult;
    }

    public void setAuditResult(String auditResult) {
        this.auditResult = auditResult;
    }

    @Basic
    @Column(name = "deal_result", nullable = true, length = 45)
    public String getDealResult() {
        return dealResult;
    }

    public void setDealResult(String dealResult) {
        this.dealResult = dealResult;
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

        ApplyEntity that = (ApplyEntity) o;

        if (id != that.id) return false;
        if (applyDefineInstanceId != that.applyDefineInstanceId) return false;
        if (applyName != null ? !applyName.equals(that.applyName) : that.applyName != null) return false;
        if (applyCode != null ? !applyCode.equals(that.applyCode) : that.applyCode != null) return false;
        if (userName != null ? !userName.equals(that.userName) : that.userName != null) return false;
        if (userCardId != null ? !userCardId.equals(that.userCardId) : that.userCardId != null) return false;
        if (userPhoneNum != null ? !userPhoneNum.equals(that.userPhoneNum) : that.userPhoneNum != null) return false;
        if (extendsJson != null ? !extendsJson.equals(that.extendsJson) : that.extendsJson != null) return false;
        if (auditResult != null ? !auditResult.equals(that.auditResult) : that.auditResult != null) return false;
        if (dealResult != null ? !dealResult.equals(that.dealResult) : that.dealResult != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;
        if (updateTime != null ? !updateTime.equals(that.updateTime) : that.updateTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + applyDefineInstanceId;
        result = 31 * result + (applyName != null ? applyName.hashCode() : 0);
        result = 31 * result + (applyCode != null ? applyCode.hashCode() : 0);
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        result = 31 * result + (userCardId != null ? userCardId.hashCode() : 0);
        result = 31 * result + (userPhoneNum != null ? userPhoneNum.hashCode() : 0);
        result = 31 * result + (extendsJson != null ? extendsJson.hashCode() : 0);
        result = 31 * result + (auditResult != null ? auditResult.hashCode() : 0);
        result = 31 * result + (dealResult != null ? dealResult.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
    }
}
