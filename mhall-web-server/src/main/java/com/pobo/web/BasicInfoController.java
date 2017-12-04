package com.pobo.web;

import com.pobo.service.BasicInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 基本信息修改
 */
@Controller
@RequestMapping("/basicInfo")
@CrossOrigin
public class BasicInfoController {
    @Autowired
    BasicInfoService basicInfoService;

    /**
     * 边跟手机号码
     */
    @GetMapping("/phoneNumberChange")
    @ResponseBody
    String phoneNumberChange() {
        return "phoneNumberChange";
    }

    /**
     * 变更身份证
     */
    void IDCardValidateChange() {
    }

    /**
     * 变更联系地址
     */
    void contactAddressChange() {
    }
}
