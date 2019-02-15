package com.tdxiov.wx_shopping.service.impl;

import com.tdxiov.wx_shopping.dao.UserDao;
import com.tdxiov.wx_shopping.jwt.IJWT;
import com.tdxiov.wx_shopping.model.User;
import com.tdxiov.wx_shopping.service.IUserService;
import com.tdxiov.wx_shopping.util.HttpRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements IUserService {
    //微信公众号appId
    public final static String APPID = "wx3411d52f54a19541";
    //微信公众号秘钥
    public final static String APPSECRET = "03a1238ffd8cb1de78885d342afe566a";
    //https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
    public final static String ACCESSTOKEN_URl = "https://api.weixin.qq.com/sns/oauth2/access_token";
    //https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    public final static String USERINFO_URl = "https://api.weixin.qq.com/sns/userinfo";


    @Autowired
    private UserDao userDao;
    @Autowired
    private IJWT jwt;

    @Override
    public Map<String, Object> getUserInfo(String code) {
        if(code != null && !"".equals(code.trim())){
            //1.获取access_token
            String param = "appid="+APPID+"&secret="+APPSECRET+"&code="+code+"&grant_type=authorization_code";
            String res = HttpRequest.sendGet(ACCESSTOKEN_URl,param);
            JSONObject resJson = new JSONObject(res);
            System.out.println(resJson);
            if(resJson.isNull("access_token")){
                throw new RuntimeException("获取access_token失败："+resJson.get("errmsg"));
            }
            //2.获取微信用户信息
            param = "access_token="+resJson.get("access_token")+"&openid="+resJson.get("openid")+"&lang=zh_CN";
            res = HttpRequest.sendGet(USERINFO_URl,param);
            resJson = new JSONObject(res);
//            System.out.println(resJson);
            if(resJson.isNull("openid")){
                throw new RuntimeException("获取微信用户信息失败："+resJson.get("errmsg"));
            }
            Map<String,Object> map = new HashMap<>();
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
            //4.1封装微信用户信息
            User wxUser = new User();
            wxUser.setOpenid(wxmap.get("openid"));
            wxUser.setSex(new Integer(wxmap.get("sex")));
            wxUser.setNickname(wxmap.get("nickname"));
            wxUser.setHeadimgurl(wxmap.get("headimgurl"));
            wxUser.setCountry(wxmap.get("country"));
            wxUser.setProvince(wxmap.get("province"));
            //4.2查询该用户是否存在
            System.out.println(resJson.get("openid").toString());
            User user = userDao.selectByOpenId(resJson.get("openid").toString().trim());
            if (user != null){
                //存在，更新微信资料
//                System.out.println("存在");
                userDao.update(wxUser);
            }else {
                //不存在，需创建
//                System.out.println("不存在");
                userDao.insert(wxUser);
                user = userDao.selectByOpenId(wxUser.getOpenid());
            }
            System.out.println(user);
            //4.3返回平台用户信息
            map.put("phone",user.getPhone());
            map.put("creditScore",user.getCreditScore());
            try {
                //5.设置token令牌
                map.put("token",jwt.createJWT(user,1*5*1000));
            }catch (Exception e){
                throw new RuntimeException("创建token出错");
            }
            return map;
        }else{
            throw new RuntimeException("参数code不存在");
        }
    }
}
