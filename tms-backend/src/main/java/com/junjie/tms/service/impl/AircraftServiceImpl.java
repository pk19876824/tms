package com.junjie.tms.service.impl;

import com.junjie.tms.dao.AircraftDAO;
import com.junjie.tms.model.Aircraft;
import com.junjie.tms.model.AircraftConfig;
import com.junjie.tms.model.AircraftVo;
import com.junjie.tms.service.AircraftService;
import com.junjie.tms.utils.JacksonUtils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

/**
 * @author junjie.zhang
 * @since 2019/5/4 9:36 PM
 */
@Service
@Slf4j
public class AircraftServiceImpl implements AircraftService {

  @Autowired
  private AircraftDAO aircraftDAO;

  @Override
  public Aircraft getById(String id) {
    if (StringUtils.isBlank(id)) {
      return null;
    }
    return aircraftDAO.getById(id);
  }

  @Override
  public List<Aircraft> getAll() {
    return aircraftDAO.getAll();
  }

  @Override
  public List<Aircraft> getIncludeAircraft(List<String> ids) {
    if (CollectionUtils.isEmpty(ids)) {
      return Collections.emptyList();
    }
    return aircraftDAO.getIncludeAircraft(ids);
  }

  @Override
  public List<Aircraft> getExcludeAircraft(List<String> ids) {
    if (CollectionUtils.isEmpty(ids)) {
      return aircraftDAO.getAll();
    }
    return aircraftDAO.getExcludeAircraft(ids);
  }

  @Override
  public int addAircraft(Aircraft aircraft) {
    return aircraftDAO.addAircraft(aircraft);
  }

  @Override
  public int updateAircraft(Aircraft aircraft) {
    return aircraftDAO.updateAircraft(aircraft);
  }

  @Override
  public int deleteById(String id) {
    return aircraftDAO.deleteById(id);
  }

  @Nullable
  public AircraftVo getAircraftVo(Aircraft aircraft) {
    if (null == aircraft) {
      return null;
    }
    if (StringUtils.isBlank(aircraft.getConfig())) {
      log.error("config is blank! aircraft:{}", aircraft);
      return null;
    }
    try {
      AircraftConfig aircraftConfig = JacksonUtils.fromJson(aircraft.getConfig(),
        AircraftConfig.class);
      return AircraftVo.builder()
        .aircraftId(aircraft.getId())
        .model(aircraft.getModel())
        .type(aircraft.getType())
        .meal(StringUtils.isBlank(aircraftConfig.getMeal()) ? "无" : aircraftConfig.getMeal())
        .hasEconomy(aircraftConfig.isHasEconomy())
        .economyConfig(aircraftConfig.getEconomyConfig())
        .hasBusiness(aircraftConfig.isHasBusiness())
        .businessConfig(aircraftConfig.getBusinessConfig())
        .build();
    } catch (IOException e) {
      log.error("json parse error! json:{}", aircraft.getConfig(), e);
      return null;
    }
  }
}
