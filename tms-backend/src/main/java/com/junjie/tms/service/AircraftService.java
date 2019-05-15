package com.junjie.tms.service;

import com.junjie.tms.model.Aircraft;
import com.junjie.tms.model.AircraftVo;

import java.util.List;

/**
 * @author junjie.zhang
 * @since 2019/5/4 9:35 PM
 */
public interface AircraftService {
  Aircraft getById(String id);

  List<Aircraft> getAll();

  List<Aircraft> getIncludeAircraft(List<String> ids);

  List<Aircraft> getExcludeAircraft(List<String> ids);

  int addAircraft(Aircraft aircraft);

  int updateAircraft(Aircraft aircraft);

  int deleteById(String id);

  AircraftVo getAircraftVo(Aircraft aircraft);
}
