package com.junjie.tms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/5/6 4:01 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ticket {
  private long id;
  private String aircraftId;
  private long airlineId;
  private long ownerId;
  private int status;
  private int seatType;
  private int price;
}
