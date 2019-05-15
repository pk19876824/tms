package com.junjie.tms.service.impl;

import com.junjie.tms.dao.TicketDAO;
import com.junjie.tms.enums.SeatTypeEnum;
import com.junjie.tms.enums.TicketStatusEnum;
import com.junjie.tms.model.Ticket;
import com.junjie.tms.service.TicketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

/**
 * @author junjie.zhang
 * @since 2019/5/6 4:08 PM
 */
@Service
@Slf4j
public class TicketServiceImpl implements TicketService {

  @Autowired
  private TicketDAO ticketDAO;

  @Override
  public int generateTicket(Ticket ticket) {
    return ticketDAO.addTicket(ticket);
  }

  @Override
  public void batchGenerateTicket(String aircraftId, long airlineId, int economyNum,
                                  int economyPrice, int businessNum, int businessPrice) {
    Ticket economyTicket = Ticket.builder()
      .aircraftId(aircraftId)
      .airlineId(airlineId)
      .seatType(SeatTypeEnum.ECONOMY.getCode())
      .price(economyPrice)
      .build();
    Ticket businessTicket = Ticket.builder()
      .aircraftId(aircraftId)
      .airlineId(airlineId)
      .seatType(SeatTypeEnum.BUSINESS.getCode())
      .price(businessPrice)
      .build();
    log.info("economyTicket:{}, businessTicket:{}", economyTicket, businessTicket);
    while (0 != economyNum) {
      try {
        generateTicket(economyTicket);
      } catch (Exception e) {
        log.error("batchGenerateTicket generate one economy ticket error!", e);
      }
      economyNum--;
    }
    while (0 != businessNum) {
      try {
        generateTicket(businessTicket);
      } catch (Exception e) {
        log.error("batchGenerateTicket generate one business ticket error!", e);
      }
      businessNum--;
    }
  }

  @Override
  public int overdueTickets(List<Long> airlineIds) {
    if (CollectionUtils.isEmpty(airlineIds)) {
      return 0;
    }
    return ticketDAO.updateTicketsStatusByAirlines(airlineIds,
      TicketStatusEnum.UNSOLD.getCode(),
      TicketStatusEnum.EXPIRED.getCode());
  }

  @Override
  public List<Ticket> getUnSoldTicketsByAirline(long airlineId) {
    return ticketDAO.getTicketsByAirlineIdAndStatus(airlineId, TicketStatusEnum.UNSOLD.getCode());
  }

  @Override
  public boolean soldTicket(long id, long ownerId) {
    Ticket ticket = ticketDAO.getById(id);
    if (null == ticket || ticket.getStatus() != TicketStatusEnum.UNSOLD.getCode()) {
      return false;
    }
    return ticketDAO.updateTicketStatusAndOwner(TicketStatusEnum.SOLD.getCode(), ownerId, id) > 0;
  }
}
