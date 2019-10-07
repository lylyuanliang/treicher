package com.zoumi.treicher.filter;

import com.zoumi.treicher.common.OtherConstants;
import com.zoumi.treicher.common.ServletPathMatcherUtil;
import com.zoumi.treicher.common.ViewPageConstants;
import org.apache.commons.lang.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * 一个简单的登录过滤器
 */
public class LoginFilter implements Filter {
    private Set<String> excludesPattern;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String param = filterConfig.getInitParameter(OtherConstants.LOGIN.PARAM_NAME_EXCLUSIONS);
        if (param != null && param.trim().length() != 0) {
            this.excludesPattern = new HashSet(Arrays.asList(param.split("\\s*,\\s*")));
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String requestURI = request.getRequestURI();
        if(this.isExclusion(requestURI, request)) {
            filterChain.doFilter(servletRequest, servletResponse);
            return ;
        }
        HttpSession session = request.getSession();
        String userName = (String) session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
        if(StringUtils.isBlank(userName)) {
            //session过期或未登陆
            response.sendRedirect(request.getContextPath() + "/");
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }

    /**
     * 判断是否需要登陆过滤
     * @param requestURI
     * @param request
     * @return
     */
    private boolean isExclusion(String requestURI, HttpServletRequest request) {
        String contextPath = request.getContextPath();

        if(this.excludesPattern == null || this.excludesPattern.isEmpty()) {
            return false;
        }

        if (contextPath != null && requestURI.startsWith(contextPath)) {
            requestURI = requestURI.substring(contextPath.length());
            if (!requestURI.startsWith("/")) {
                requestURI = "/" + requestURI;
            }
        }

        for(String excludeUrl: this.excludesPattern) {
            boolean matches = ServletPathMatcherUtil.matches(excludeUrl, requestURI);
            if(matches) {
                return true;
            }
        }

        return false;
    }
}
