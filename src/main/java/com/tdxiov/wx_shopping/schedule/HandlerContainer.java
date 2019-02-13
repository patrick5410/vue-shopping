package com.tdxiov.wx_shopping.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class HandlerContainer implements ApplicationListener<ContextRefreshedEvent> {
    //容器初始化最大容量
    private final static int MAX_SIZE = 100;
    //任务执行间隔时间，即开始执行和当前间隔时间差，达到这个时间差时就返回该Handler
    private final static int HANDLER_TIME = 1000;//单位毫秒
    // 线程安全
    private List<Handler> list = Collections.synchronizedList(new ArrayList(MAX_SIZE));
    //数据库是否有数据，当且仅当为true时，容器没有元素时才触发回调方法
    private boolean hasData = true;
    //锁对象，监听对象
//    public static final Object LOCK = new Object();

    @Autowired
    private WebApplicationContext webApplicationContext;

//     不使用这个注解，防止spring容器还没加载完一些bean对象
//    @PostConstruct
//    public void init(){
//
//    }

    /**
     * springboot容器初始化后回调
     * @param contextRefreshedEvent
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        Map<String, Life4HandlerContainer> map = webApplicationContext.getBeansOfType(Life4HandlerContainer.class);
        Set<String> keys = map.keySet();
        Iterator iterator = keys.iterator();
        while (iterator.hasNext()) {
            Life4HandlerContainer life = map.get(iterator.next());
            life.init();
        }

    }

    public void put(Date handlerDate, Runnable handler) {
        synchronized (this.list) {
            //容器还没满或添加处理任务时间比容器最后一个元素时间早
            if (this.list.size() < this.MAX_SIZE || this.list.get(this.list.size() - 1).handlerDate.after(handlerDate)) {
                Handler h = new Handler(handlerDate, handler);
                this.list.add(h);
                Collections.sort(list, new Comparator<Handler>() {
                    @Override
                    public int compare(Handler h1, Handler h2) {
                        if (h1.handlerDate.before(h2.handlerDate)) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
                System.out.println("即将唤醒线程");
                this.list.notifyAll();
            } else {
                this.hasData = true;
            }
            System.out.println("当前容器元素数量：" + list.size());
            System.out.println("打印元素：" + this.list);
        }
    }


    public int getSize() {
        return list.size();
    }

    public Handler getHandler() {
        synchronized (this.list) {
            if (!this.list.isEmpty()) {
                Handler handler = this.list.get(0);
                System.out.println("获取Handler元素");
                if (handler.handlerDate.getTime() - new Date().getTime() <= HANDLER_TIME) {
                    this.removeHandler();
                    return handler;
                } else {
                    try {
                        this.list.wait(handler.handlerDate.getTime() - new Date().getTime() - HANDLER_TIME);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
            return null;
        }
    }

    /**
     * 移除第一个元素
     */
    public void removeHandler() {
        synchronized (this.list) {
            this.list.remove(0);
            //判断容器元素数量，如果为零就触发
            System.out.println("容器是否为空：" + this.list.isEmpty() + ",数据库是否有数据：" + this.hasData);
            if (this.list.isEmpty() && this.hasData) {
                System.out.println("执行触发事件");
                //触发事件
                Map<String, Life4HandlerContainer> map = webApplicationContext.getBeansOfType(Life4HandlerContainer.class);
                Set<String> keys = map.keySet();
                Iterator iterator = keys.iterator();
                while (iterator.hasNext()) {
                    Life4HandlerContainer callBack4Empty = map.get(iterator.next());
                    callBack4Empty.callBack4Empty();
                }
                if (this.list.isEmpty()) {
                    this.hasData = false;
                    System.out.println("为空回调后，数据库没有数据了");
                }

            }
        }
    }


    class Handler implements Runnable {
        public Date handlerDate;//执行时间
        private Runnable handler;//执行任务

        protected Handler(Date handlerDate, Runnable handler) {
            this.handlerDate = handlerDate;
            this.handler = handler;
        }

        @Override
        public void run() {
            Timer t = new Timer();
            System.out.println("准备执行更改状态操作！");
            t.schedule(new TimerTask() {//t.schedule()第一个参数为TimerTask类的对象，该处为匿名内部类，必须覆盖run()方法
                public void run() {
                    System.out.println("开始执行状态更改！");
                    handler.run();
                    System.out.println("执行更改状态成功！");
                }
            }, this.handlerDate);//定时执行时间
        }

        @Override
        public String toString() {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return "Handler{" +
                    "handlerDate=" + sdf.format(handlerDate) +
                    ", handler=" + handler +
                    '}';
        }
    }


}
