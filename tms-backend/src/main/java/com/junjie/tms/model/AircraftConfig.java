package com.junjie.tms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/5/3 11:09 AM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AircraftConfig {
  private String meal;
  boolean hasEconomy; //是否有经济舱
  SeatConfig economyConfig; //经济舱配置
  boolean hasBusiness;//是否有商务舱
  SeatConfig businessConfig;//商务舱配置
}
