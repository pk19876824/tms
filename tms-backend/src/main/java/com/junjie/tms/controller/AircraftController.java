package com.junjie.tms.controller;

import com.junjie.tms.enums.AirlineStatusEnum;
import com.junjie.tms.enums.ErrorCodeEnum;
import com.junjie.tms.model.Aircraft;
import com.junjie.tms.model.AircraftConfig;
import com.junjie.tms.model.AircraftVo;
import com.junjie.tms.model.Airline;
import com.junjie.tms.service.AircraftService;
import com.junjie.tms.service.AirlineService;
import com.junjie.tms.utils.JacksonUtils;
import com.junjie.tms.utils.RestJsonUtil;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;

/**
 * @author junjie.zhang
 * @since 2019/5/4 7:53 PM
 */
@CrossOrigin
@RestController
@RequestMapping("aircraft")
@Slf4j
public class AircraftController {

  @Autowired
  private AircraftService aircraftService;

  @Autowired
  private AirlineService airlineService;

  @PostMapping("")
  public String addAircraft(@RequestBody AircraftVo aircraftVo) {
    if (StringUtils.isBlank(aircraftVo.getAircraftId())) {
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.AIRCRAFT_ID_BLANK);
    }
    try {
      Aircraft af = aircraftService.getById(aircraftVo.getAircraftId());
      if (null != af) {
        return RestJsonUtil.resultWithFailed(ErrorCodeEnum.AIRCRAFT_ID_EXIST);
      }

      Aircraft addAircraft = getAircraft(aircraftVo);

      aircraftService.addAircraft(addAircraft);

      return RestJsonUtil.resultOk();
    } catch (Exception e) {
      log.error("unknown error!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }

  @PutMapping("")
  public String updateAircraft(@RequestBody AircraftVo aircraftVo) {
    if (StringUtils.isBlank(aircraftVo.getAircraftId())) {
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.AIRCRAFT_ID_BLANK);
    }
    try {
      Aircraft updateAircraft = getAircraft(aircraftVo);

      aircraftService.updateAircraft(updateAircraft);

      return RestJsonUtil.resultOk();
    } catch (Exception e) {
      log.error("unknown error!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }

  @GetMapping("all")
  public String getAllAircraft() {
    List<Aircraft> aircraftList = aircraftService.getAll();
    List<Map<String, AircraftVo>> aircraftVoList = new ArrayList<>();
    for (Aircraft aircraft : aircraftList) {
      AircraftVo aircraftVo = aircraftService.getAircraftVo(aircraft);
      if (null != aircraftVo) {
        Map<String, AircraftVo> map = new HashMap<>();
        map.put("detail", aircraftVo);
        aircraftVoList.add(map);
      }
    }
    return RestJsonUtil.resultOk(aircraftVoList);
  }

  @GetMapping("free")
  public String getFreeAircraft(@RequestParam("startTime") Date startTime,
                                @RequestParam("endTime") Date endTime) {
    if (startTime.getTime() >= endTime.getTime()) {
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.STARTTIME_MORE_THAN_ENDTIME);
    }
    try {
      List<AircraftVo> aircraftVoList = airlineService.getFreeAircraft(startTime, endTime);
      List<String> freeAircraftIds =
        aircraftVoList.stream().map(AircraftVo::getAircraftId).collect(Collectors.toList());
      Map<String, List<Airline>> airlinesMap =
        airlineService.batchGetAirlinesByAircraftIds(freeAircraftIds);

      List<Map<String, Object>> result = new ArrayList<>();

      aircraftVoList.forEach(x -> {
        List<Airline> airlines = airlinesMap.get(x.getAircraftId());

        Map<Integer, List<Airline>> airlineStatusMap = Optional
          .ofNullable(airlines)
          .orElse(Collections.emptyList())
          .stream().collect(Collectors.groupingBy(Airline::getStatus));

        Map<String, Object> airStatusOrderMap = new HashMap<>();

        //history
        List<Airline> historyAirlines =
          Optional.ofNullable(airlineStatusMap.get(AirlineStatusEnum.FINISHED.getCode()))
            .orElse(new ArrayList<>());
        historyAirlines.sort(Comparator.comparing(Airline::getStartTime));

        //inFlight
        List<Airline> inFlightAirlines =
          Optional.ofNullable(airlineStatusMap.get(AirlineStatusEnum.IN_FLIGHT.getCode()))
            .orElse(new ArrayList<>());
        inFlightAirlines.sort(Comparator.comparing(Airline::getStartTime));

        //notStart
        List<Airline> notStartAirlines =
          Optional.ofNullable(airlineStatusMap.get(AirlineStatusEnum.NOT_START.getCode()))
            .orElse(new ArrayList<>());
        notStartAirlines.sort(Comparator.comparing(Airline::getStartTime));

        airStatusOrderMap.put("history", historyAirlines);
        airStatusOrderMap.put("inFlight", inFlightAirlines);
        airStatusOrderMap.put("notStart", notStartAirlines);
        airStatusOrderMap.put("latest", historyAirlines.isEmpty() ? null :
          historyAirlines.get(historyAirlines.size() - 1));

        Map<String, Object> map = new HashMap<>();
        map.put("detail", x);
        map.put("airlines", airStatusOrderMap);
        result.add(map);
      });

      return RestJsonUtil.resultOk(result);
    } catch (Exception e) {
      log.error("getFreeAircraft exception!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }

  @DeleteMapping("")
  public String deleteAircraft(@RequestParam("aircraftId") String aircraftId) {
    try {
      int result = aircraftService.deleteById(aircraftId);
      if (0 == result) {
        return RestJsonUtil.resultWithFailed(ErrorCodeEnum.AIRCRAFT_ID_NOT_EXIST);
      } else {
        return RestJsonUtil.resultOk();
      }
    } catch (Exception e) {
      log.error("exception!", e);
      return RestJsonUtil.resultWithFailed(ErrorCodeEnum.UNKNOWN_ERROR);
    }
  }

  private Aircraft getAircraft(AircraftVo aircraftVo) {
    AircraftConfig aircraftConfig = AircraftConfig.builder()
      .meal(StringUtils.isBlank(aircraftVo.getMeal()) ? "无" : aircraftVo.getMeal())
      .hasEconomy(aircraftVo.isHasEconomy())
      .economyConfig(aircraftVo.isHasEconomy() ? aircraftVo.getEconomyConfig() : null)
      .hasBusiness(aircraftVo.isHasBusiness())
      .businessConfig(aircraftVo.isHasBusiness() ? aircraftVo.getBusinessConfig() : null)
      .build();

    return Aircraft.builder()
      .id(aircraftVo.getAircraftId().replaceAll(" ", ""))
      .model(aircraftVo.getModel().replaceAll(" ", ""))
      .type(aircraftVo.getType())
      .config(JacksonUtils.toJson(aircraftConfig))
      .build();
  }
}
