package com.tdxiov.wx_shopping.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

@Component
public class HttpInterceptor implements HandlerInterceptor {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("执行拦截器");
        if(request.getHeaders("token").hasMoreElements()){
            String token = request.getHeaders("token").nextElement();
            System.out.println("打印token");
            System.out.println(token);
        }else {
            System.out.println("没有token");
            //没有登录需重定向到首页
            response.sendRedirect("http://www.tdxiov.com/shopping/index");
        }
        return true;
    }
}
