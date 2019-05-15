package com.junjie.tms.utils;

import com.google.common.base.Throwables;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

/**
 * @author junjie.zhang
 * @since 2019/4/19 3:24 PM
 */
public class JacksonUtils {
  private static final ObjectMapper objMapper = new ObjectMapper();

  private JacksonUtils() {

  }

  public static String toJson(Object obj) {
    try {
      return objMapper.writeValueAsString(obj);
    } catch (JsonProcessingException e) {
      throw Throwables.propagate(e);
    }

  }

  public static <T> String toJson(Object obj, Class<T> jsonViewClazz) {
    try {
      return objMapper.writerWithView(jsonViewClazz).writeValueAsString(obj);
    } catch (JsonProcessingException e) {
      throw Throwables.propagate(e);
    }
  }

  public static JsonNode toJsonNode(String jsonText) throws IOException {
    return objMapper.readTree(jsonText);
  }

  public static <T> T fromJson(String jsonText, Class<T> clazz) throws IOException {
    return jsonText != null && !"".equals(jsonText) ? objMapper.readValue(jsonText, clazz) : null;
  }

  public static <T> T fromJson(String jsonText, TypeReference<T> valueTypeRef) throws IOException {
    return jsonText != null && !"".equals(jsonText) ?
      objMapper.readValue(jsonText, valueTypeRef) : null;
  }

  public static <T> List<T> fromJson2List(String jsonText, Class<T> clazz) throws IOException {
    if (jsonText != null && !"".equals(jsonText)) {
      JavaType t = objMapper.getTypeFactory().constructParametricType(List.class, clazz);
      return objMapper.readValue(jsonText, t);
    }
    return null;
  }
}
