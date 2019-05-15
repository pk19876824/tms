package com.junjie.tms.controller;

import com.junjie.tms.enums.ErrorCodeEnum;
import com.junjie.tms.model.Aircraft;
import com.junjie.tms.model.AircraftVo;
import com.junjie.tms.model.Airline;
import com.junjie.tms.model.AirlineVo;
import com.junjie.tms.service.AircraftService;
import com.junjie.tms.service.AirlineService;
import com.junjie.tms.utils.RestJsonUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;

/**
 * @author junjie.zhang
 * @since 2019/5/5 11:54 PM
 */
@CrossOrigin
@RestController
@Slf4j
@RequestMapping("airline")
public class AirlineController {

  @Autowired
  private AircraftService aircraftService;

  @Autowired
  private AirlineService airlineService;

  private static final String SORT_PRICE = "minPrice";
  private static final String SORT_START_TIME = "startTime";
  private static final String SORT_END_TIME = "endTime";
  private static final String SORT_ORDER_ASC = "ascend";
  private static final String SORT_ORDER_DESC = "descend";


  @PostMapping("")
  public String addAirline(@RequestParam("aircraftId") String aircraftId,
                           @RequestParam("startTime") Date startTime,
                           @RequestParam("endTime") Date endTime,
                           @RequestParam("startLocation") String startLocation,
                           @RequestParam("endLocation") String endLocation,
                           @RequestParam("economyPrice") int economyPrice,
                           @RequestParam("businessPrice") int businessPrice) {
    try {
      //1.检查时间是否合法
      if (startTime.getTime() >= endTime.getTime()) {
        return RestJsonUtil.resultWithFailed(ErrorCodeEnum.STARTTIME_MORE_THAN_ENDTIME);
      }
      //2.检查飞机是否存在
      Aircraft aircraft = aircraftService.getById(aircraftId);
      if (null == aircraft) {
        return RestJsonUtil.resultWithFailed(ErrorCodeEnum.AIRCRAFT_ID_NOT_EXIST);
      }
      //3.检查飞机是否空闲
      List<Airline> airlines = airlineService.getAirlinesByAircraftId(aircraftId);
      for (Airline airline : airlines) {
        if (!(endTime.getTime() < airline.getStartTime().getTime() || startTime.getTime() > airline.getEndTime().getTime())) {
          return RestJsonUtil.resultWithFailed(ErrorCodeEnum.AIRCRAFT_BUZY_IN_AIRLINE);
        }
      }
      //4.添加航程
      Airline addAirline = Airline.builder()
        .aircraftId(aircraftId)
        .startTime(startTime)
        .endTime(endTime)
        .startLocation(startLocation)
        .endLocation(endLocation)
        .economyPrice(economyPrice)
        .businessPrice(businessPrice)
        .build();
      airlineService.addAirline(addAirline);
      return RestJsonUtil.resultOk();
    } catch (Exception e) {
      log.error("addAirline exception!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }

  @GetMapping("")
  public String searchAirline(@RequestParam("startTime") Date startTime,
                              @RequestParam("endTime") Date endTime,
                              @RequestParam("startLocation") String startLocation,
                              @RequestParam("endLocation") String endLocation,
                              @RequestParam(value = "sortField", required = false, defaultValue =
                                SORT_PRICE) String sortField,
                              @RequestParam(value = "sortOrder", required = false, defaultValue =
                                SORT_ORDER_ASC) String sortOrder) {
    try {
      List<Airline> airlines = airlineService.searchAirline(startTime, endTime, startLocation,
        endLocation);

      List<String> aircraftIds =
        airlines.stream().map(Airline::getAircraftId).collect(Collectors.toList());
      Map<String, Aircraft> aircraftMap = aircraftService.getIncludeAircraft(aircraftIds)
        .stream().collect(Collectors.toMap(Aircraft::getId, Function.identity()));

      List<AirlineVo> result = new ArrayList<>();
      for (Airline airline : airlines) {
        AircraftVo aircraftVo =
          aircraftService.getAircraftVo(aircraftMap.get(airline.getAircraftId()));
        if (null == aircraftVo) {
          log.warn("AircraftVo is null! Airline:{}", airline);
          continue;
        }
        Double economyPrice = aircraftVo.isHasEconomy() ? airline.getEconomyPrice() :
          Double.POSITIVE_INFINITY;
        Double businessPrice = aircraftVo.isHasBusiness() ? airline.getBusinessPrice() :
          Double.POSITIVE_INFINITY;
        int minPrice = (int) Math.min(economyPrice, businessPrice);
        AirlineVo airlineVo = AirlineVo.builder()
          .aircraft(aircraftVo)
          .airline(airline)
          .startTime(airline.getStartTime())
          .endTime(airline.getEndTime())
          .minPrice(minPrice)
          .build();
        result.add(airlineVo);
      }

      if (!CollectionUtils.isEmpty(result)) {
        Comparator<AirlineVo> comparator =
          Comparator.comparing(AirlineVo::getMinPrice);
        if (SORT_ORDER_ASC.equals(sortOrder)) {
          result.sort(comparator);
          result.get(0).setMinPriceFlag(true);
        } else if (SORT_ORDER_DESC.equals(sortOrder)) {
          result.sort(comparator.reversed());
          result.get(result.size() - 1).setMinPriceFlag(true);
        }

        switch (sortField) {
          case SORT_START_TIME: {
            Comparator<AirlineVo> cp =
              Comparator.comparing(AirlineVo::getStartTime);
            if (SORT_ORDER_ASC.equals(sortOrder)) {
              result.sort(cp);
            } else if (SORT_ORDER_DESC.equals(sortOrder)) {
              result.sort(cp.reversed());
            }
            break;
          }
          case SORT_END_TIME: {
            Comparator<AirlineVo> cp =
              Comparator.comparing(AirlineVo::getEndTime);
            if (SORT_ORDER_ASC.equals(sortOrder)) {
              result.sort(cp);
            } else if (SORT_ORDER_DESC.equals(sortOrder)) {
              result.sort(cp.reversed());
            }
            break;
          }
          default:
        }
      }

      return RestJsonUtil.resultOk(result);
    } catch (Exception e) {
      log.error("searchAirline exception!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }
}
