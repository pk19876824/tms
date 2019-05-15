package com.junjie.tms.enums;

/**
 * @author junjie.zhang
 * @since 2019/4/21 3:06 PM
 */
public enum ErrorCodeEnum {
  OK(0, "Success"),
  UNKNOWN_ERROR(1000, "Server Error"),

  AIRCRAFT_ID_BLANK(1002, "航班号不能为空!"),
  AIRCRAFT_ID_EXIST(1002, "航班号已存在!"),
  AIRCRAFT_ID_NOT_EXIST(1003, "航班号不存在!"),

  STARTTIME_MORE_THAN_ENDTIME(2000, "起飞时间应小于降落时间!"),
  AIRCRAFT_BUZY_IN_AIRLINE(2001, "该飞机在该时间段已有航程安排!"),

  TICKET_SOLD_FAILURE(3001, "出票失败,请稍后尝试!");

  private int errorCode;
  private String errorMsg;

  ErrorCodeEnum(int errorCode, String errorMsg) {
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  public int getErrorCode() {
    return errorCode;
  }

  public String getErrorMsg() {
    return errorMsg;
  }
}
