package com.tdxiov.wx_shopping.interceptor;

import com.tdxiov.wx_shopping.jwt.IJWT;
import com.tdxiov.wx_shopping.model.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class HttpInterceptor implements HandlerInterceptor {
    @Autowired
    private IJWT jwt;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("执行拦截器");
        //没有登录或登录过期通知前端删除用户信息，重新登录
        JSONObject jsonResp = new JSONObject();
        if(request.getHeaders("token").hasMoreElements()){
            String token = request.getHeaders("token").nextElement();
            System.out.println("打印token");
            System.out.println(token);
            try{
                User user = jwt.getUser(token);
                System.out.println(user);
                return true;
            }catch (Exception e){
                //token过期,或无效
                e.printStackTrace();
                jsonResp.put("errorCode",10010);
                jsonResp.put("errorDesc","token过期或者无效，请重新登录获取");
            }
        }else {
            //没有登录
            jsonResp.put("errorCode",10000);
            jsonResp.put("errorDesc","请先登录获取token");
        }

        PrintWriter out = null;
        try {
            //设定类容为json的格式
            response.setContentType("application/json;charset=UTF-8");
            out = response.getWriter();
            //设置数据
            jsonResp.put("success",false);
            //写到客户端
            out.write(jsonResp.toString());
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            if(out != null){
                out.close();
            }
        }
        return false;
    }
}
