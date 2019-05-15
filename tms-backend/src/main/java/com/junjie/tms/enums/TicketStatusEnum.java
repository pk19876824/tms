package com.junjie.tms.enums;

/**
 * @author junjie.zhang
 * @since 2019/5/6 4:40 PM
 */
public enum TicketStatusEnum {
  UNSOLD(0),
  SOLD(1),
  EXPIRED(2);

  private int code;

  TicketStatusEnum(int code) {
    this.code = code;
  }

  public int getCode() {
    return code;
  }
}
