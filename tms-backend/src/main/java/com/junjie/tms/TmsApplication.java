package com.junjie.tms;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author junjie.zhang
 * @since 2019/5/2 11:13 AM
 */
@SpringBootApplication
@MapperScan("com.junjie.tms.dao")
@EnableScheduling
public class TmsApplication {
  public static void main(String[] args) {
    SpringApplication.run(TmsApplication.class, args);
  }
}
