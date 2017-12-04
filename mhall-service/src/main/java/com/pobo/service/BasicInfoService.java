package com.pobo.service;

/**
 * 基本信息修改Service
 */
public interface BasicInfoService {
    /**
     * 变更手机号码
     */
    void phoneNumberChange();

    /**
     * 变更身份证
     */
    void IDCardValidateChange();

    /**
     * 变更联系地址
     */
    void contactAddressChange();
}
