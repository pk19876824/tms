package com.junjie.tms.enums;

/**
 * @author junjie.zhang
 * @since 2019/5/6 11:57 PM
 */
public enum AirlineStatusEnum {
  NOT_START(0),
  IN_FLIGHT(1),
  FINISHED(2);

  private int code;

  AirlineStatusEnum(int code) {
    this.code = code;
  }

  public int getCode() {
    return code;
  }
}
