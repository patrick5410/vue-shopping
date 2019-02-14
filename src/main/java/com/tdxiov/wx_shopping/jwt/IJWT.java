package com.tdxiov.wx_shopping.jwt;

import com.tdxiov.wx_shopping.model.User;
import io.jsonwebtoken.Claims;

/**
 * jwt管理工具
 */
public interface IJWT {

     /**
      * 创建JWT
      * @param user
      * @param timeInMills
      * @return
      * @throws Exception
      */
     public String createJWT(User user, long timeInMills) throws Exception;

     /**
      * 解析JWT
      * @param jwt
      * @return
      * @throws Exception
      */
     public Claims parseJWT(String jwt) throws Exception;

     /**
      * 从JWT中获取User信息
      * @param jwt
      * @return
      * @throws Exception
      */
     public User getUser(String jwt) throws Exception;
}
