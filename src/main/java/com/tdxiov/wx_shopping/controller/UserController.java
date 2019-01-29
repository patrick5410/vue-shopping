package com.tdxiov.wx_shopping.controller;

import com.tdxiov.wx_shopping.util.HttpRequest;
import com.tdxiov.wx_shopping.util.ResponseJsonUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/user")
public class UserController {
    //微信公众号appId
    public final static String APPID = "wx3411d52f54a19541";
    //微信公众号秘钥
    public final static String APPSECRET = "03a1238ffd8cb1de78885d342afe566a";

    //https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
    public final static String ACCESSTOKEN_URl = "https://api.weixin.qq.com/sns/oauth2/access_token";
    //https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    public final static String USERINFO_URl = "https://api.weixin.qq.com/sns/userinfo";


    @PostMapping("/getUserInfo")
    public ResponseJsonUtil<Object> getUserInfo(String code){
        ResponseJsonUtil<Object> json = null;
        try {
            if(code != null && !"".equals(code.trim())){
                //1.获取access_token
                String param = "appid="+APPID+"&secret="+APPSECRET+"&code="+code+"&grant_type=authorization_code";
                String res = HttpRequest.sendGet(ACCESSTOKEN_URl,param);
                JSONObject resJson = new JSONObject(res);
                System.out.println(resJson.get("access_token"));
                System.out.println(resJson.get("openid"));
                //2.获取微信用户信息
                param = "access_token="+resJson.get("access_token")+"&openid="+resJson.get("openid")+"&lang=zh_CN";
                res = HttpRequest.sendGet(USERINFO_URl,param);
                resJson = new JSONObject(res);

                HashMap<String,Object> map = new HashMap<>();
                //3.封装微信用户信息
                HashMap<String,String> wxmap = new HashMap<>();
                wxmap.put("openid",resJson.get("openid").toString());
                wxmap.put("sex",resJson.get("sex").toString());
                wxmap.put("nickname",resJson.get("nickname").toString());
                wxmap.put("headimgurl",resJson.get("headimgurl").toString());
                wxmap.put("country",resJson.get("country").toString());
                wxmap.put("province",resJson.get("province").toString());
                map.put("wechatInfo",wxmap);

                //4.获取电商用户信息
                map.put("username","jackson");
                json = new ResponseJsonUtil<>(map);
            }else{
                throw new RuntimeException("参数code不存在");
            }
        }catch (Exception e){
            System.out.println(e);
            json = new ResponseJsonUtil<>(e);
        }
        return json;
    }
}
