package com.tdxiov.wx_shopping.schedule;

public interface Life4HandlerContainer {
    /**
     * 容器初始化，从数据库中加载一些需要定时处理的任务
     */
    void init();

    /**
     * 容器为空时回调，往容器中继续添加元素
     */
    void callBack4Empty();
}
