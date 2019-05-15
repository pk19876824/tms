package com.junjie.tms.controller;

import com.junjie.tms.utils.RestJsonUtil;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.Collator;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

/**
 * @author junjie.zhang
 * @since 2019/5/2 12:23 AM
 */
@RestController
@RequestMapping("city")
@Slf4j
@CrossOrigin
public class CityController {


  @GetMapping
  public String getCities() {
    List<String> cities = Arrays.asList(
      "北京", "上海", "深圳", "武汉", "长沙", "成都", "哈尔滨", "重庆", "齐齐哈尔", "九江", "随州", "洛阳"
    );
    Comparator<Object> comparator = Collator.getInstance(java.util.Locale.CHINA);
    cities.sort(comparator);
    return RestJsonUtil.resultOk(cities);
  }
}
