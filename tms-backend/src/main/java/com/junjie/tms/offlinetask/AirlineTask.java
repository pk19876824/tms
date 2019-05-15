package com.junjie.tms.offlinetask;

import com.junjie.tms.model.Airline;
import com.junjie.tms.service.AirlineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author junjie.zhang
 * @since 2019/5/7 10:07 AM
 */
@Component("AirlineTask")
public class AirlineTask {

  private static final long oneMinute = 60000L;

  @Autowired
  private AirlineService airlineService;

  @Scheduled(initialDelay = oneMinute, fixedDelay = oneMinute)
  public void taskOff() {
    List<Airline> overdueTakeOffAirlines = airlineService.getOverdueTakeOffAirlines();
    if (CollectionUtils.isEmpty(overdueTakeOffAirlines)) {
      return;
    }
    List<Long> ids =
      overdueTakeOffAirlines.stream().map(Airline::getId).collect(Collectors.toList());
    airlineService.batchTakeOffAirlines(ids);
  }

  @Scheduled(initialDelay = oneMinute, fixedDelay = oneMinute)
  public void landing() {
    List<Airline> overdueTakeOffAirlines = airlineService.getOverdueLandingAirlines();
    if (CollectionUtils.isEmpty(overdueTakeOffAirlines)) {
      return;
    }
    List<Long> ids =
      overdueTakeOffAirlines.stream().map(Airline::getId).collect(Collectors.toList());
    airlineService.batchLandingAirlines(ids);
  }
}
