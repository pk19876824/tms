package com.junjie.tms.service;

import com.junjie.tms.model.Ticket;

import java.util.List;

/**
 * @author junjie.zhang
 * @since 2019/5/6 4:05 PM
 */
public interface TicketService {
  int generateTicket(Ticket ticket);

  void batchGenerateTicket(String aircraftId,
                           long airlineId,
                           int economyNum,
                           int economyPrice,
                           int businessNum,
                           int businessPrice);

  int overdueTickets(List<Long> airlineIds);

  List<Ticket> getUnSoldTicketsByAirline(long airlineId);

  boolean soldTicket(long id, long ownerId);
}
