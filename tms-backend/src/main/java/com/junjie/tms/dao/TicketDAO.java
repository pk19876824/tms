package com.junjie.tms.dao;

import com.junjie.tms.model.Ticket;
import com.junjie.tms.utils.BatchOperationLanguageDriver;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Lang;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author junjie.zhang
 * @since 2019/5/6 3:53 PM
 */
public interface TicketDAO {
  String TABLE = "ticket";
  String ALL_COL = "id, aircraft_id, airline_id, owner_id, status, seat_type, price";

  @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
  @Insert("insert into " +
    TABLE +
    " set aircraft_id = #{aircraftId}," +
    " airline_id = #{airlineId}," +
    " seat_type = #{seatType}," +
    " price = #{price}")
  int addTicket(Ticket ticket);

  @Select("select " + ALL_COL + " from " + TABLE + " where id = #{id} and delete_flag = 0")
  Ticket getById(@Param("id") long id);

  @Lang(BatchOperationLanguageDriver.class)
  @Update("update " +
    TABLE +
    " set" +
    " status = #{toStatus}" +
    " where status = #{fromStatus}" +
    " and airline_id in (#{airlineIds})")
  int updateTicketsStatusByAirlines(@Param("airlineIds") List<Long> airlineIds,
                                    @Param("fromStatus") int fromStatus,
                                    @Param("toStatus") int toStatus);

  @Update("update " + TABLE + " set status = #{status}, owner_id = #{ownerId} where id = #{id}")
  int updateTicketStatusAndOwner(@Param("status") int status,
                                 @Param("ownerId") long ownerId,
                                 @Param("id") long id);

  @Select("select " +
    ALL_COL +
    " from " +
    TABLE +
    " where airline_id = #{airlineId}" +
    " and status = #{status}" +
    " and delete_flag = 0")
  @Results({
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "airlineId", column = "airline_id"),
    @Result(property = "ownerId", column = "owner_id"),
    @Result(property = "seatType", column = "seat_type")
  })
  List<Ticket> getTicketsByAirlineIdAndStatus(@Param("airlineId") long airlineId,
                                              @Param("status") int status);
}
