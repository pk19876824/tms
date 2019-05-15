package com.junjie.tms.enums;

/**
 * @author junjie.zhang
 * @since 2019/5/6 4:26 PM
 */
public enum AirlineTicketStatusEnum {
  UN_TICKETING(0),
  TICKETING(1);

  private int code;

  AirlineTicketStatusEnum(int code) {
    this.code = code;
  }

  public int getCode() {
    return code;
  }
}
