package com.tdxiov.wx_shopping.controller;

import com.tdxiov.wx_shopping.dao.UserDao;
import com.tdxiov.wx_shopping.jwt.IJWT;
import com.tdxiov.wx_shopping.model.User;
import com.tdxiov.wx_shopping.service.IUserService;
import com.tdxiov.wx_shopping.util.HttpRequest;
import com.tdxiov.wx_shopping.util.ResponseJsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private IJWT jwt;




    @PostMapping("/getUserInfo")
    public ResponseJsonUtil<Object> getUserInfo(@RequestBody String param,@RequestHeader HttpHeaders headers){
        ResponseJsonUtil<Object> json = null;
        try {
            JSONObject jsonParam = new JSONObject(param);
            System.out.println(jsonParam.toString());
            String code = jsonParam.get("code").toString();
            System.out.println(headers);
//            System.out.println(code);
            Map<String, Object> map = userService.getUserInfo(code);
            json = new ResponseJsonUtil<>(map);
            headers.set("token",map.get("token").toString());
        }catch (Exception e){
            e.printStackTrace();
            json = new ResponseJsonUtil<>(e);
        }
        return json;
    }

    @PostMapping("/test")
    public ResponseJsonUtil<Object> test(@RequestHeader HttpHeaders headers){
        ResponseJsonUtil<Object> json = new ResponseJsonUtil<>();
        try {
            System.out.println(headers);
        }catch (Exception e){
            e.printStackTrace();
            json = new ResponseJsonUtil<>(e);
        }
        return json;
    }

}
