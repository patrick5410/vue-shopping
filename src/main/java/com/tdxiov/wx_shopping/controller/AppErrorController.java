package com.tdxiov.wx_shopping.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/shopping")
public class AppErrorController{





    @RequestMapping("/**")
    public  String forward(){
        System.out.println("访问");
        return "forward:/index.html";
    }
}
