package com.junjie.tms.controller;

import com.junjie.tms.enums.ErrorCodeEnum;
import com.junjie.tms.enums.SeatTypeEnum;
import com.junjie.tms.model.Ticket;
import com.junjie.tms.model.TicketVo;
import com.junjie.tms.service.TicketService;
import com.junjie.tms.utils.RestJsonUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;

/**
 * @author junjie.zhang
 * @since 2019/5/7 5:04 PM
 */
@RestController
@RequestMapping("ticket")
@CrossOrigin
@Slf4j
public class TicketController {

  @Autowired
  private TicketService ticketService;

  @GetMapping("")
  public String getTickets(@RequestParam("airlineId") long airlineId) {
    try {
      List<Ticket> tickets = ticketService.getUnSoldTicketsByAirline(airlineId);
      Map<Integer, List<Ticket>> ticketSeatTypeMap =
        tickets.stream().collect(Collectors.groupingBy(Ticket::getSeatType));

      List<TicketVo> result = new ArrayList<>();
      for (List<Ticket> ts : ticketSeatTypeMap.values()) {
        ts.sort(Comparator.comparing(Ticket::getPrice));
        Ticket cheapestTicket = ts.get(0);
        result.add(TicketVo.builder()
          .cheapestTicketId(cheapestTicket.getId())
          .amount(ts.size())
          .minPrice(cheapestTicket.getPrice())
          .seatType(cheapestTicket.getSeatType())
          .seatDescription(SeatTypeEnum.getDescriptionByCode(cheapestTicket.getSeatType()))
          .build());
      }
      result.sort(Comparator.comparing(TicketVo::getMinPrice));
      if (!CollectionUtils.isEmpty(result)) {
        result.get(0).setCheapestSeatFlag(true);
      }
      return RestJsonUtil.resultOk(result);
    } catch (Exception e) {
      log.error("getTickets exception!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }

  @PutMapping("")
  public String soldTicket(@RequestParam("ticketId") long ticketId,
                           @RequestParam("ownerId") long ownerId) {
    try {
      boolean result = ticketService.soldTicket(ticketId, ownerId);
      if (result) {
        return RestJsonUtil.resultOk();
      }
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.TICKET_SOLD_FAILURE);
    } catch (Exception e) {
      log.error("soldTicket exception!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }
}
