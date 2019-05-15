package com.junjie.tms.enums;

/**
 * @author junjie.zhang
 * @since 2019/5/6 4:12 PM
 */
public enum SeatTypeEnum {
  ECONOMY(0, "经济舱"),
  BUSINESS(1, "商务舱");

  private int code;
  private String description;

  SeatTypeEnum(int code, String description) {
    this.code = code;
    this.description = description;
  }

  public static SeatTypeEnum getByCode(int code) {
    for (SeatTypeEnum seatTypeEnum : SeatTypeEnum.values()) {
      if (code == seatTypeEnum.getCode()) {
        return seatTypeEnum;
      }
    }
    return null;
  }

  public static String getDescriptionByCode(int code) {
    SeatTypeEnum seatTypeEnum = getByCode(code);
    return null == seatTypeEnum ? "未知" : seatTypeEnum.getDescription();
  }

  public int getCode() {
    return code;
  }

  public String getDescription() {
    return description;
  }
}
