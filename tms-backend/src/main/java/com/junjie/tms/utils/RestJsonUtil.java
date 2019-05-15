package com.junjie.tms.utils;


import com.junjie.tms.enums.ErrorCodeEnum;

import java.util.HashMap;
import java.util.Map;

/**
 * @author junjie.zhang
 * @since 2019/4/21 3:06 PM
 */
public class RestJsonUtil {
  private RestJsonUtil() {
  }

  public static String resultOk() {
    return result(ErrorCodeEnum.OK, null);
  }

  public static String resultOk(Object data) {
    return result(ErrorCodeEnum.OK, data);
  }

  public static String resultWithFailed(ErrorCodeEnum errorCodeEnum) {
    return result(errorCodeEnum.getErrorCode(), errorCodeEnum.getErrorMsg(), null);
  }

  public static String result(ErrorCodeEnum errorCodeEnum, Object data) {
    return result(errorCodeEnum.getErrorCode(), errorCodeEnum.getErrorMsg(), data);
  }

  public static String result(int resultCode, String resultMsg, Object data) {
    return result(resultCode, resultMsg, data, null);
  }

  public static <T> String result(int resultCode, String resultMsg, Object data,
                                  Class<T> jsonViewClazz) {
    Map<String, Object> result = getResultMap(resultCode, resultMsg, data);
    return null == jsonViewClazz ? JacksonUtils.toJson(result) : JacksonUtils.toJson(result,
      jsonViewClazz);
  }

  private static Map<String, Object> getResultMap(int resultCode, String resultMsg, Object data) {
    Map<String, Object> status = new HashMap<>();
    status.put("code", resultCode);
    status.put("msg", String.valueOf(resultMsg));
    Map<String, Object> result = new HashMap<>();
    result.put("status", status);
    if (null != data) {
      result.put("data", data);
    }

    return result;
  }
}
