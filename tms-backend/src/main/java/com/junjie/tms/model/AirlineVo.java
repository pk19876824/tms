package com.junjie.tms.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/5/7 9:34 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AirlineVo {
  private AircraftVo aircraft;
  private Airline airline;
  private Date startTime;
  private Date endTime;
  private int minPrice;
  private boolean minPriceFlag;
}
