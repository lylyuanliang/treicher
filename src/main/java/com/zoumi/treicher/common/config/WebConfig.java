package com.zoumi.treicher.common.config;

import com.zoumi.treicher.common.OtherConstants;
import com.zoumi.treicher.filter.LoginFilter;
import com.zoumi.treicher.vo.LoginFilterProperty;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.DispatcherServlet;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebConfig {

    @Autowired
    private LoginFilterProperty loginFilterProperty;

    @Bean
    public FilterRegistrationBean loginFilterBean() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        LoginFilter loginFilter = new LoginFilter();
        registrationBean.setFilter(loginFilter);
        //设置过滤器拦截请求
        List<String> urls = new ArrayList<>();
        urls.add("/*");
        registrationBean.setUrlPatterns(urls);

        String noNeedFilterUri = getNoNeedFilterUri();
        registrationBean.addInitParameter(OtherConstants.LOGIN.PARAM_NAME_EXCLUSIONS, noNeedFilterUri);

        return registrationBean;
    }



    /**
     * 获取不需要过滤的url
     * @return
     */
    private String getNoNeedFilterUri() {
        String uri = loginFilterProperty.getUri();
        return uri;
    }
}
