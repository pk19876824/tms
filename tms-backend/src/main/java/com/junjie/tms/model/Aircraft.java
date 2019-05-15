package com.junjie.tms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author junjie.zhang
 * @since 2019/4/30 2:45 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Aircraft {
  private String id;
  private String model;
  private String type;
  private String config; //AircraftConfig的json模式
}
