package com.tdxiov.wx_shopping.util;

import java.io.Serializable;

/**
 * 固定格式的接口返回数据
 * @param <T>
 */
public class ResponseJsonUtil<T> implements Serializable{
    private static final long serialVersionUID = -3636927133619005805L;
    private Boolean success;//请求是否成功访问到接口
    private Integer errorCode;//如不成功，则错误代码
    private String errorDesc;//错误描述
    private T data;//接口返回数据


    public ResponseJsonUtil(){}

    public ResponseJsonUtil(T data){
        this.data = data;
        this.success = true;
    }

    public ResponseJsonUtil(Exception e){
        this.success = false;
        this.setErrorCode(-1);
        this.setErrorDesc(e.getMessage());
    }

    public ResponseJsonUtil(T data, String errorDesc, Boolean success, Integer errorCode){
        this.data = data;
        this.errorDesc = errorDesc;
        this.success = success;
        this.errorCode =errorCode;
    }



    public void setData(T data) {
        this.data = data;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    public void setErrorDesc(String errorDesc) {
        this.errorDesc = errorDesc;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Boolean getSuccess() {
        return success;
    }

    public Integer getErrorCode() { return errorCode; }

    public String getErrorDesc() {
        return errorDesc;
    }

    public T getData() {
        return data;
    }
}
