package com.pobo.dao.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "t_ocr_token", schema = "pobo_mhall", catalog = "")
public class OcrTokenEntity {
    private int id;
    private String ocrToken;
    private String ocrStatus;
    private String ocrFailureCode;
    private String ocrFailureContext;
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
    @Column(name = "ocr_token", nullable = false, length = 45)
    public String getOcrToken() {
        return ocrToken;
    }

    public void setOcrToken(String ocrToken) {
        this.ocrToken = ocrToken;
    }

    @Basic
    @Column(name = "ocr_status", nullable = false, length = 45)
    public String getOcrStatus() {
        return ocrStatus;
    }

    public void setOcrStatus(String ocrStatus) {
        this.ocrStatus = ocrStatus;
    }

    @Basic
    @Column(name = "ocr_failure_code", nullable = true, length = 20)
    public String getOcrFailureCode() {
        return ocrFailureCode;
    }

    public void setOcrFailureCode(String ocrFailureCode) {
        this.ocrFailureCode = ocrFailureCode;
    }

    @Basic
    @Column(name = "ocr_failure_context", nullable = true, length = 200)
    public String getOcrFailureContext() {
        return ocrFailureContext;
    }

    public void setOcrFailureContext(String ocrFailureContext) {
        this.ocrFailureContext = ocrFailureContext;
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

        OcrTokenEntity that = (OcrTokenEntity) o;

        if (id != that.id) return false;
        if (ocrToken != null ? !ocrToken.equals(that.ocrToken) : that.ocrToken != null) return false;
        if (ocrStatus != null ? !ocrStatus.equals(that.ocrStatus) : that.ocrStatus != null) return false;
        if (ocrFailureCode != null ? !ocrFailureCode.equals(that.ocrFailureCode) : that.ocrFailureCode != null)
            return false;
        if (ocrFailureContext != null ? !ocrFailureContext.equals(that.ocrFailureContext) : that.ocrFailureContext != null)
            return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;
        if (updateTime != null ? !updateTime.equals(that.updateTime) : that.updateTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (ocrToken != null ? ocrToken.hashCode() : 0);
        result = 31 * result + (ocrStatus != null ? ocrStatus.hashCode() : 0);
        result = 31 * result + (ocrFailureCode != null ? ocrFailureCode.hashCode() : 0);
        result = 31 * result + (ocrFailureContext != null ? ocrFailureContext.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
    }
}
