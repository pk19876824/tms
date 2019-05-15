package com.junjie.tms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/5/8 12:22 AM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketVo {
  int seatType;
  String seatDescription;
  int minPrice;
  long cheapestTicketId;
  int amount;
  boolean cheapestSeatFlag;
}
