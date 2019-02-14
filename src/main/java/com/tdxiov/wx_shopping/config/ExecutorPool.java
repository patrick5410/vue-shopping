package com.tdxiov.wx_shopping.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 定时任务线程池配置
 */
@Configuration
@EnableAsync
public class ExecutorPool {

    @Bean("executorService")
    public ExecutorService getExecutor() {
        return Executors.newFixedThreadPool(100);
    }
}
