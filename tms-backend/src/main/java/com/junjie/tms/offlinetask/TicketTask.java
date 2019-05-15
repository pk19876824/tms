package com.junjie.tms.offlinetask;

import com.junjie.tms.model.Aircraft;
import com.junjie.tms.model.AircraftVo;
import com.junjie.tms.model.Airline;
import com.junjie.tms.service.AircraftService;
import com.junjie.tms.service.AirlineService;
import com.junjie.tms.service.TicketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

/**
 * @author junjie.zhang
 * @since 2019/5/6 11:55 AM
 */
@Component("TicketGenerateTask")
@Slf4j
public class TicketTask {

  private static final long oneMinute = 60000L;

  @Autowired
  private AirlineService airlineService;

  @Autowired
  private AircraftService aircraftService;

  @Autowired
  private TicketService ticketService;

  @Scheduled(initialDelay = oneMinute, fixedDelay = oneMinute)
  public void generateTickets() {
    List<Airline> unTickedAirlines = airlineService.getAllUnTickedAirlines();
    for (Airline airline : unTickedAirlines) {
      try {
        Aircraft aircraft = aircraftService.getById(airline.getAircraftId());
        AircraftVo aircraftVo = aircraftService.getAircraftVo(aircraft);
        if (null == aircraftVo) {
          log.warn("generate tickets for one airline failure! airline:{}", airline);
          continue;
        }
        ticketService.batchGenerateTicket(aircraftVo.getAircraftId(),
          airline.getId(),
          aircraftVo.isHasEconomy() ? aircraftVo.getEconomyConfig().getSeatNum() : 0,
          aircraftVo.isHasEconomy() ? airline.getEconomyPrice() : 0,
          aircraftVo.isHasBusiness() ? aircraftVo.getBusinessConfig().getSeatNum() : 0,
          aircraftVo.isHasBusiness() ? airline.getBusinessPrice() : 0);
        airlineService.ticketing(airline.getId());
      } catch (Exception e) {
        log.error("generate tickets for one airline exception! airline:{}", airline, e);
      }
    }
  }

  @Scheduled(initialDelay = oneMinute, fixedDelay = oneMinute)
  public void dealOverdueTickets() {
    List<Long> airlineIds = airlineService.getStopTickingAirlines();
    ticketService.overdueTickets(airlineIds);
  }
}
