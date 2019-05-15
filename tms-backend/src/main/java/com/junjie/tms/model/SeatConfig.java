package com.junjie.tms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/5/3 10:38 AM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SeatConfig {
  int seatNum;      //座位数
  int seatSpacing;  //座位间距
  int seatWidth;    //座位宽度
  int rake;         //座位可倾斜度
  boolean wifi;
  boolean tv;
}
