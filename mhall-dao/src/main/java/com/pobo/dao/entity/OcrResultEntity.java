package com.pobo.dao.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "t_ocr_result", schema = "pobo_mhall", catalog = "")
public class OcrResultEntity {
    private int id;
    private String ocrToken;
    private String name;
    private String cardId;
    private String realImg;
    private String texturedImg;
    private String idcardImg;
    private String idcardImgBack;
    private String bankcardNo;
    private String bankName;
    private String bankCardType;
    private String bankCardImg;
    private Timestamp createTime;

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
    @Column(name = "name", nullable = false, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "card_id", nullable = false, length = 18)
    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    @Basic
    @Lob
    @Column(name = "real_img", nullable = true, length = -1)
    public String getRealImg() {
        return realImg;
    }

    public void setRealImg(String realImg) {
        this.realImg = realImg;
    }

    @Basic
    @Lob
    @Column(name = "textured_img", nullable = true, length = -1)
    public String getTexturedImg() {
        return texturedImg;
    }

    public void setTexturedImg(String texturedImg) {
        this.texturedImg = texturedImg;
    }

    @Basic
    @Lob
    @Column(name = "idcard_img", nullable = true, length = -1)
    public String getIdcardImg() {
        return idcardImg;
    }

    public void setIdcardImg(String idcardImg) {
        this.idcardImg = idcardImg;
    }

    @Basic
    @Lob
    @Column(name = "idcard_img_back", nullable = true, length = -1)
    public String getIdcardImgBack() {
        return idcardImgBack;
    }

    public void setIdcardImgBack(String idcardImgBack) {
        this.idcardImgBack = idcardImgBack;
    }

    @Basic
    @Column(name = "bankcard_no", nullable = true, length = 45)
    public String getBankcardNo() {
        return bankcardNo;
    }

    public void setBankcardNo(String bankcardNo) {
        this.bankcardNo = bankcardNo;
    }

    @Basic
    @Column(name = "bank_name", nullable = true, length = 45)
    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    @Basic
    @Column(name = "bank_card_type", nullable = true, length = 45)
    public String getBankCardType() {
        return bankCardType;
    }

    public void setBankCardType(String bankCardType) {
        this.bankCardType = bankCardType;
    }

    @Basic
    @Lob
    @Column(name = "bank_card_img", nullable = true, length = -1)
    public String getBankCardImg() {
        return bankCardImg;
    }

    public void setBankCardImg(String bankCardImg) {
        this.bankCardImg = bankCardImg;
    }

    @Basic
    @Column(name = "create_time", nullable = true)
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OcrResultEntity that = (OcrResultEntity) o;

        if (id != that.id) return false;
        if (ocrToken != null ? !ocrToken.equals(that.ocrToken) : that.ocrToken != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (cardId != null ? !cardId.equals(that.cardId) : that.cardId != null) return false;
        if (realImg != null ? !realImg.equals(that.realImg) : that.realImg != null) return false;
        if (texturedImg != null ? !texturedImg.equals(that.texturedImg) : that.texturedImg != null) return false;
        if (idcardImg != null ? !idcardImg.equals(that.idcardImg) : that.idcardImg != null) return false;
        if (idcardImgBack != null ? !idcardImgBack.equals(that.idcardImgBack) : that.idcardImgBack != null)
            return false;
        if (bankcardNo != null ? !bankcardNo.equals(that.bankcardNo) : that.bankcardNo != null) return false;
        if (bankName != null ? !bankName.equals(that.bankName) : that.bankName != null) return false;
        if (bankCardType != null ? !bankCardType.equals(that.bankCardType) : that.bankCardType != null) return false;
        if (bankCardImg != null ? !bankCardImg.equals(that.bankCardImg) : that.bankCardImg != null) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (ocrToken != null ? ocrToken.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (cardId != null ? cardId.hashCode() : 0);
        result = 31 * result + (realImg != null ? realImg.hashCode() : 0);
        result = 31 * result + (texturedImg != null ? texturedImg.hashCode() : 0);
        result = 31 * result + (idcardImg != null ? idcardImg.hashCode() : 0);
        result = 31 * result + (idcardImgBack != null ? idcardImgBack.hashCode() : 0);
        result = 31 * result + (bankcardNo != null ? bankcardNo.hashCode() : 0);
        result = 31 * result + (bankName != null ? bankName.hashCode() : 0);
        result = 31 * result + (bankCardType != null ? bankCardType.hashCode() : 0);
        result = 31 * result + (bankCardImg != null ? bankCardImg.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        return result;
    }
}
