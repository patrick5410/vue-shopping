package com.tdxiov.wx_shopping.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.concurrent.ExecutorService;

@Component
public class HandlerControl{
    @Autowired
    private ExecutorService executorService;
    @Autowired
    private HandlerContainer handlerContainer;

//    @Async("executorService")
    public void run() {
        System.out.println("执行时机");
    }

    @PostConstruct
    public void init() throws Exception{
        System.out.println("【"+this.getClass().getSimpleName()+"】调用注解@PostConstruct定义的自定义初始化方法");
        //另起一个线程
        Thread thread = new Contol();
        thread.start();
    }


    class Contol extends Thread{
        @Override
        public void run() {
            System.out.println("执行任务处理器");
            //初始化任务控制器
            try {
                while (true){
                    Runnable handler = handlerContainer.getHandler();
                    if(handler != null){
                        System.out.println("执行任务："+handler);
                        executorService.execute(handler);
                    }
                }

            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }
}
