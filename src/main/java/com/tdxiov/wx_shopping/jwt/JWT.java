package com.tdxiov.wx_shopping.jwt;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tdxiov.wx_shopping.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;

@Component
public class JWT implements IJWT{

    private static String jwtKey = "tdcm_mobile";//secretKey组成部分
    private static String issuer = "com.tdx.mobile";//签发机构
    private static String signKey = "7d89a2ac23d9ad03d84dfb8e38d876ed";//secretKey组成部分

    @Override
    public String createJWT(User user, long timeInMills) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMills = System.currentTimeMillis();
        Date now = new Date(nowMills);
        SecretKey key = generalKey();
        Gson gson = new Gson();
        JwtBuilder builder = Jwts.builder()
                .setId("jwt")
                .setIssuedAt(now)
                .setIssuer(issuer)
                .setSubject(gson.toJson(user))
                .signWith(signatureAlgorithm, key);
        long expMills = nowMills + timeInMills;
        Date exp = new Date(expMills);
        builder.setExpiration(exp)  // 过期时间
                .setNotBefore(now); // 失效时间
        return builder.compact();
    }

    @Override
    public Claims parseJWT(String jwt) {
        SecretKey key = generalKey();
        Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(jwt).getBody();
        return claims;
    }

    @Override
    public User getUser(String jwt) {
        Claims claims = parseJWT(jwt);
        if (claims != null) {
            User user = new Gson().fromJson(claims.getSubject(),
                    new TypeToken<User>(){}.getType());
            return user;
        }
        return null;
    }

    private SecretKey generalKey() {
        String stringKey = jwtKey + "." + signKey;
        byte[] encodedKey = Base64.decodeBase64(stringKey);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }
}
