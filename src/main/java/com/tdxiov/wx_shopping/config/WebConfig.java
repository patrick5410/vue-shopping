package com.tdxiov.wx_shopping.config;


import com.tdxiov.wx_shopping.interceptor.HttpInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.net.Inet4Address;
import java.util.ArrayList;
import java.util.List;

/**
 * 自定义配置
 */
@Configuration
@SpringBootConfiguration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private HttpInterceptor interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor).
                excludePathPatterns("/user/getUserInfo" //获取用户信息不拦截
                ,"/img/*","/js/*","/css/*","/fonts/*"//资源路径
                ,"/index.html");//首页
    }


}
