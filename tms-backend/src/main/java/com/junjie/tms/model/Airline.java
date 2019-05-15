package com.junjie.tms.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/4/30 4:24 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Airline {
  private long id;
  private String aircraftId;
  private String startLocation;
  private String endLocation;
  private Date startTime;
  private Date endTime;
  private int status;
  private int ticketStatus;
  private int economyPrice;
  private int businessPrice;
}
