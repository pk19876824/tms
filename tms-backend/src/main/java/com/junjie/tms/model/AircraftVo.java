package com.junjie.tms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/5/4 8:02 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AircraftVo {
  private String aircraftId;
  private String model;
  private String type;
  private String meal;
  boolean hasEconomy; //是否有经济舱
  SeatConfig economyConfig; //经济舱配置
  boolean hasBusiness;//是否有商务舱
  SeatConfig businessConfig;//商务舱配置
}
