package com.junjie.tms.utils;

import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.scripting.LanguageDriver;
import org.apache.ibatis.scripting.xmltags.XMLLanguageDriver;
import org.apache.ibatis.session.Configuration;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author junjie.zhang
 * @since 2019/4/21 4:50 PM
 */
public class BatchOperationLanguageDriver extends XMLLanguageDriver implements LanguageDriver {

  private final Pattern IN_PATTERN = Pattern.compile("\\(#\\{(\\w+)}\\)");

  private final Pattern CDATA_PATTERN = Pattern.compile("( [^ ]+? (<|>|<=|>=|<>) [^ ]+? )");

  @Override
  public SqlSource createSqlSource(Configuration configuration, String script,
                                   Class<?> parameterType) {
    Matcher matcher = IN_PATTERN.matcher(script);
    if (matcher.find()) {
      script = matcher.replaceAll("(<foreach collection=\"$1\" item=\"__item\" separator=\",\" " +
        ">#{__item}</foreach>)");
    }
    Matcher cdataMatcher = CDATA_PATTERN.matcher(script);
    if (cdataMatcher.find()) {
      script = cdataMatcher.replaceAll(" <![CDATA[$1]]> ");
    }
    script = "<script>" + script + "</script>";
    return super.createSqlSource(configuration, script, parameterType);
  }
}
