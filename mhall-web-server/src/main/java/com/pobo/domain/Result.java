package com.pobo.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

public class Result implements Serializable {
    private int errcode;
    private String errmsg;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public static Result ofSuccess() {
        return new Result(0, "success");
    }

    public static Result ofSuccess(String msg) {
        return new Result(0, msg);
    }

    public static Result ofFailure(int errcode, String errmsg) {
        return new Result(errcode, errmsg);
    }

    public static Result of(int errcode, String errmsg, Object data) {
        return new Result(errcode, errmsg, data);
    }

    public Result() {
    }

    public Result(int errcode, String errmsg) {
        this.errcode = errcode;
        this.errmsg = errmsg;
    }

    public Result(int errcode, String errmsg, Object data) {
        this.errcode = errcode;
        this.errmsg = errmsg;
        this.data = data;
    }

    public int getErrcode() {
        return errcode;
    }

    public void setErrcode(int errcode) {
        this.errcode = errcode;
    }

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
