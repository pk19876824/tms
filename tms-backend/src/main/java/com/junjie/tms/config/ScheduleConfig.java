package com.junjie.tms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

/**
 * spring scheduling的线程池配置
 *
 * @author junjie.zhang
 * @since 2019/5/6 11:56 AM
 */
@Configuration
public class ScheduleConfig implements SchedulingConfigurer {

  @Override
  public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
    taskRegistrar.setScheduler(taskExecutor());
  }

  @Bean(destroyMethod = "shutdown")
  public ScheduledExecutorService taskExecutor() {
    return Executors.newScheduledThreadPool(12);
  }
}
