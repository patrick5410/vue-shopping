package com.tdxiov.wx_shopping.service;

import java.util.Map;

public interface IUserService {

    /**
     * 根据微信code获取用户信息，如果不存在则创建
     * @param code
     * @return
     */
    Map<String,Object> getUserInfo(String code);
}
