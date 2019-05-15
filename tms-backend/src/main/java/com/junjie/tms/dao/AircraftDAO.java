package com.junjie.tms.dao;

import com.junjie.tms.model.Aircraft;
import com.junjie.tms.utils.BatchOperationLanguageDriver;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Lang;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author junjie.zhang
 * @since 2019/4/30 3:56 PM
 */
public interface AircraftDAO {
  String TABLE = "aircraft";
  String ALL_COL = "id, model, type, config";

  @Select("select " + ALL_COL + " from " + TABLE + " where id = #{id}")
  Aircraft getById(@Param("id") String id);

  @Lang(BatchOperationLanguageDriver.class)
  @Select("select " + ALL_COL + " from " + TABLE + " where id in (#{ids})")
  List<Aircraft> getIncludeAircraft(@Param("ids") List<String> ids);

  @Lang(BatchOperationLanguageDriver.class)
  @Select("select " + ALL_COL + " from " + TABLE + " where id not in (#{ids})")
  List<Aircraft> getExcludeAircraft(@Param("ids") List<String> ids);

  @Select("select " + ALL_COL + " from " + TABLE)
  List<Aircraft> getAll();

  @Insert("insert into " +
    TABLE +
    " set id = #{id}," +
    " model = #{model}," +
    " type = #{type}," +
    " config = #{config}")
  int addAircraft(Aircraft aircraft);

  @Update("update " +
    TABLE +
    " set model = #{model}," +
    " type = #{type}," +
    " config = #{config} where id = #{id}")
  int updateAircraft(Aircraft aircraft);

  @Delete("delete from " + TABLE + " where id = #{id}")
  int deleteById(@Param("id") String id);
}
