package com.tdxiov.wx_shopping.interceptor;

import com.tdxiov.wx_shopping.jwt.IJWT;
import com.tdxiov.wx_shopping.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

@Component
public class HttpInterceptor implements HandlerInterceptor {
    @Autowired
    private IJWT jwt;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("执行拦截器");
        if(request.getHeaders("token").hasMoreElements()){
            String token = request.getHeaders("token").nextElement();
            System.out.println("打印token");
            System.out.println(token);
            try{
                User user = jwt.getUser(token);
                System.out.println(user);
                return true;
            }catch (Exception e){
                //token过期
                e.printStackTrace();
            }
        }
        //没有登录或登录过期需重定向到首页
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        response.setHeader("X-Powered-By","Jetty");
        response.setHeader("Origin","http://www.tdxiov.com");
        response.sendRedirect("http://www.tdxiov.com/shopping/reLogin");
        return false;
    }
}
