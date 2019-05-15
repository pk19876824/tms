package com.junjie.tms.dao;

import com.junjie.tms.model.Airline;
import com.junjie.tms.utils.BatchOperationLanguageDriver;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Lang;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;
import java.util.List;

/**
 * @author junjie.zhang
 * @since 2019/4/30 4:27 PM
 */
public interface AirlineDAO {
  String TABLE = "airline";
  String ALL_COL = "id, aircraft_id, start_location, end_location, start_time, end_time, status, " +
    "ticket_status, economy_price, business_price";

  @Select("select " + ALL_COL + " from " + TABLE + " where aircraft_id = #{aircraftId} and " +
    "delete_flag = 0")
  @Results(value = {
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "startLocation", column = "start_location"),
    @Result(property = "endLocation", column = "end_location"),
    @Result(property = "startTime", column = "start_time"),
    @Result(property = "endTime", column = "end_time"),
    @Result(property = "ticketStatus", column = "ticket_status"),
    @Result(property = "economyPrice", column = "economy_price"),
    @Result(property = "businessPrice", column = "business_price"),
  })
  List<Airline> getByAircraftId(@Param("aircraftId") String aircraftId);

  @Lang(BatchOperationLanguageDriver.class)
  @Select("select " + ALL_COL + " from " + TABLE + " where aircraft_id in (#{aircraftIds}) and " +
    "delete_flag = 0")
  @Results(value = {
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "startLocation", column = "start_location"),
    @Result(property = "endLocation", column = "end_location"),
    @Result(property = "startTime", column = "start_time"),
    @Result(property = "endTime", column = "end_time"),
    @Result(property = "ticketStatus", column = "ticket_status"),
    @Result(property = "economyPrice", column = "economy_price"),
    @Result(property = "businessPrice", column = "business_price"),
  })
  List<Airline> batchGetByAircraftIds(@Param("aircraftIds") List<String> aircraftIds);

  @Select("select " +
    " id " +
    " from " +
    TABLE +
    " where delete_flag = 0" +
    " and date_sub(start_time, interval #{minuteStep} minute) < now()")
  List<Long> getStopTickingAirlines(@Param("minuteStep") int minuteStep);

  @Select("select " +
    ALL_COL +
    " from " +
    TABLE +
    " where delete_flag = 0" +
    " and status in (0,1)")
  @Results(value = {
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "startLocation", column = "start_location"),
    @Result(property = "endLocation", column = "end_location"),
    @Result(property = "startTime", column = "start_time"),
    @Result(property = "endTime", column = "end_time"),
    @Result(property = "ticketStatus", column = "ticket_status"),
    @Result(property = "economyPrice", column = "economy_price"),
    @Result(property = "businessPrice", column = "business_price"),
  })
  List<Airline> getScheduledAirlines();

  @Select("select " +
    ALL_COL +
    " from " +
    TABLE +
    " where delete_flag = 0" +
    " and status = 0 " +
    " and start_time < now()")
  @Results(value = {
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "startLocation", column = "start_location"),
    @Result(property = "endLocation", column = "end_location"),
    @Result(property = "startTime", column = "start_time"),
    @Result(property = "endTime", column = "end_time"),
    @Result(property = "ticketStatus", column = "ticket_status"),
    @Result(property = "economyPrice", column = "economy_price"),
    @Result(property = "businessPrice", column = "business_price"),
  })
  List<Airline> getOverdueTakeOffAirlines();

  @Select("select " +
    ALL_COL +
    " from " +
    TABLE +
    " where delete_flag = 0" +
    " and status = 1 " +
    " and end_time < now()")
  @Results(value = {
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "startLocation", column = "start_location"),
    @Result(property = "endLocation", column = "end_location"),
    @Result(property = "startTime", column = "start_time"),
    @Result(property = "endTime", column = "end_time"),
    @Result(property = "ticketStatus", column = "ticket_status"),
    @Result(property = "economyPrice", column = "economy_price"),
    @Result(property = "businessPrice", column = "business_price"),
  })
  List<Airline> getOverdueLandingAirlines();

  @Lang(BatchOperationLanguageDriver.class)
  @Update("update " + TABLE + " set status = #{status} where id in (#{ids})")
  int batchUpdateStatus(@Param("ids") List<Long> ids,
                        @Param("status") int status);

  @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
  @Insert({"insert into " +
    TABLE +
    " set aircraft_id = #{aircraftId}," +
    " start_location = #{startLocation}," +
    " end_location = #{endLocation}," +
    " start_time = #{startTime}," +
    " end_time = #{endTime}," +
    " economy_price = #{economyPrice}," +
    " business_price = #{businessPrice}"})
  int addAirline(Airline airline);

  @Select("select " +
    ALL_COL +
    " from " +
    TABLE +
    " where delete_flag = 0" +
    " and ticket_status = 0")
  @Results(value = {
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "startLocation", column = "start_location"),
    @Result(property = "endLocation", column = "end_location"),
    @Result(property = "startTime", column = "start_time"),
    @Result(property = "endTime", column = "end_time"),
    @Result(property = "ticketStatus", column = "ticket_status"),
    @Result(property = "economyPrice", column = "economy_price"),
    @Result(property = "businessPrice", column = "business_price"),
  })
  List<Airline> getAllUnTickedAirlines();

  @Update("update " + TABLE + " set ticket_status = #{ticketStatus} where id = #{id}")
  int updateTicketStatus(@Param("id") long id, @Param("ticketStatus") int ticketStatus);

  @Select("select " +
    ALL_COL +
    " from " +
    TABLE +
    " where delete_flag = 0" +
    " and status = 0" +
    " and ticket_status = 1" +
    " and start_location = #{startLocation}" +
    " and end_location = #{endLocation}" +
    " and start_time > #{startTime}" +
    " and start_time < #{endTime}")
  @Results(value = {
    @Result(property = "aircraftId", column = "aircraft_id"),
    @Result(property = "startLocation", column = "start_location"),
    @Result(property = "endLocation", column = "end_location"),
    @Result(property = "startTime", column = "start_time"),
    @Result(property = "endTime", column = "end_time"),
    @Result(property = "ticketStatus", column = "ticket_status"),
    @Result(property = "economyPrice", column = "economy_price"),
    @Result(property = "businessPrice", column = "business_price"),
  })
  List<Airline> searchAirline(@Param("startTime") Date startTime,
                              @Param("endTime") Date endTime,
                              @Param("startLocation") String startLocation,
                              @Param("endLocation") String endLocation);
}
