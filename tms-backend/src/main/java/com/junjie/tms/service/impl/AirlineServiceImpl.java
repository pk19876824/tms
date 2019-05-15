package com.junjie.tms.service.impl;

import com.junjie.tms.dao.AirlineDAO;
import com.junjie.tms.enums.AirlineStatusEnum;
import com.junjie.tms.enums.AirlineTicketStatusEnum;
import com.junjie.tms.model.Aircraft;
import com.junjie.tms.model.AircraftVo;
import com.junjie.tms.model.Airline;
import com.junjie.tms.service.AircraftService;
import com.junjie.tms.service.AirlineService;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author junjie.zhang
 * @since 2019/5/5 5:34 PM
 */
@Service
public class AirlineServiceImpl implements AirlineService {

  @Autowired
  private AircraftService aircraftService;

  @Autowired
  private AirlineDAO airlineDAO;

  @Override
  public List<AircraftVo> getFreeAircraft(Date startTime, Date endTime) {
    List<Airline> scheduledAirlines = airlineDAO.getScheduledAirlines();

    List<String> busyAircraftIds = scheduledAirlines.stream()
      .filter(x -> !(endTime.getTime() < x.getStartTime().getTime() || startTime.getTime() > x.getEndTime().getTime()))
      .map(Airline::getAircraftId)
      .collect(Collectors.toList());

    List<Aircraft> aircraftList = aircraftService.getExcludeAircraft(busyAircraftIds);
    List<AircraftVo> aircraftVoList = new ArrayList<>();

    aircraftList.forEach(x -> {
      AircraftVo aircraftVo = aircraftService.getAircraftVo(x);
      if (null != aircraftVo) {
        aircraftVoList.add(aircraftVo);
      }
    });

    return aircraftVoList;
  }

  @Override
  public List<Long> getStopTickingAirlines() {
    return airlineDAO.getStopTickingAirlines(10);
  }

  @Override
  public List<Airline> getAirlinesByAircraftId(String aircraftId) {
    if (StringUtils.isBlank(aircraftId)) {
      return Collections.emptyList();
    }
    return airlineDAO.getByAircraftId(aircraftId);
  }

  @Override
  public Map<String, List<Airline>> batchGetAirlinesByAircraftIds(List<String> aircraftIds) {
    if (CollectionUtils.isEmpty(aircraftIds)) {
      return Collections.emptyMap();
    }
    List<Airline> airlines = airlineDAO.batchGetByAircraftIds(aircraftIds);
    return airlines.stream().collect(Collectors.groupingBy(Airline::getAircraftId));
  }

  @Override
  public int addAirline(Airline airline) {
    return airlineDAO.addAirline(airline);
  }

  @Override
  public List<Airline> getAllUnTickedAirlines() {
    return airlineDAO.getAllUnTickedAirlines();
  }

  @Override
  public int ticketing(long id) {
    return airlineDAO.updateTicketStatus(id, AirlineTicketStatusEnum.TICKETING.getCode());
  }

  @Override
  public List<Airline> getOverdueTakeOffAirlines() {
    return airlineDAO.getOverdueTakeOffAirlines();
  }

  @Override
  public List<Airline> getOverdueLandingAirlines() {
    return airlineDAO.getOverdueLandingAirlines();
  }

  @Override
  public int batchTakeOffAirlines(List<Long> ids) {
    if (CollectionUtils.isEmpty(ids)) {
      return 0;
    }
    return airlineDAO.batchUpdateStatus(ids, AirlineStatusEnum.IN_FLIGHT.getCode());
  }

  @Override
  public int batchLandingAirlines(List<Long> ids) {
    if (CollectionUtils.isEmpty(ids)) {
      return 0;
    }
    return airlineDAO.batchUpdateStatus(ids, AirlineStatusEnum.FINISHED.getCode());
  }

  @Override
  public List<Airline> searchAirline(Date startTime, Date endTime, String startLocation,
                                     String endLocation) {
    if (null == startTime || null == endTime || StringUtils.isBlank(startLocation) || StringUtils.isBlank(endLocation)) {
      return Collections.emptyList();
    }
    return airlineDAO.searchAirline(startTime, endTime, startLocation, endLocation);
  }
}
