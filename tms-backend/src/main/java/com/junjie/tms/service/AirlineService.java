package com.junjie.tms.service;

import com.junjie.tms.model.AircraftVo;
import com.junjie.tms.model.Airline;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author junjie.zhang
 * @since 2019/5/5 5:29 PM
 */
public interface AirlineService {
  List<AircraftVo> getFreeAircraft(Date startTime, Date endTime);

  List<Airline> getAirlinesByAircraftId(String aircraftId);

  List<Long> getStopTickingAirlines();

  Map<String, List<Airline>> batchGetAirlinesByAircraftIds(List<String> aircraftIds);

  int addAirline(Airline airline);

  List<Airline> getAllUnTickedAirlines();

  int ticketing(long id);

  List<Airline> getOverdueTakeOffAirlines();

  List<Airline> getOverdueLandingAirlines();

  int batchTakeOffAirlines(List<Long> ids);

  int batchLandingAirlines(List<Long> ids);

  List<Airline> searchAirline(Date startTime,
                              Date endTime,
                              String startLocation,
                              String endLocation);
}
