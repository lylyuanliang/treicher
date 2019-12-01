package com.zoumi.treicher.controller;

import com.zoumi.treicher.common.OtherConstants;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URL;

public class BaseController {

    private static final String paramPath = "D:/zoumi/params/maxUserNum";
    /**
     * 获取session
     * @return
     */
    protected HttpSession getSession() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();
        HttpSession session = request.getSession();
        return session;
    }

    /**
     * 获取用户编号
     * @return
     * @throws FileNotFoundException
     */
    protected String getUserNum() throws FileNotFoundException {
        HttpSession session = getSession();
        String userName =(String)session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
        String key = userName + OtherConstants.LOGIN.LAST_WARDS_USER_NUM;
        String userNum = (String) session.getAttribute(key);
        if(StringUtils.isBlank(userNum)) {
            userNum = getMaxUserNum();
            session.setAttribute(key, userNum);
        }
        return userNum;
    }

    /**
     * 获取最大用户号
     *      没有并发，可以用这个方法
     * @return
     */
    private String getMaxUserNum() throws FileNotFoundException {
        File file = ResourceUtils.getFile(paramPath);
        BufferedReader reader = null;
        StringBuffer sbf = new StringBuffer();
        try {
            reader = new BufferedReader(new FileReader(file));
            String tempStr;
            while ((tempStr = reader.readLine()) != null) {
                sbf.append(tempStr);
            }
            reader.close();
            String maxUserNum = sbf.toString();
            Integer max = Integer.parseInt(maxUserNum);
            //增一
            max ++;
            max = max % 4;

            if(max == 0) {
                max = 4;
            }

            String maxStr = String.valueOf(max);
            //保存最大值
            WriteMaxUserNum(maxStr, paramPath);
            return maxStr;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
        return sbf.toString();
    }

    /**
     * 保存最大用户号
     * @param maxUserNum
     * @param url
     */
    private void WriteMaxUserNum(String maxUserNum, String url) throws IOException {
        File file = new File(url);//url 如果不存在需要创建一个
        BufferedWriter bw = null;
        FileWriter fileWriter = null;
        try {
            file.createNewFile();//创建一个新的文件

            fileWriter = new FileWriter(file);
            bw = new BufferedWriter(fileWriter);
            bw.write(maxUserNum);
            bw.flush();// 把缓存区内容压入文件
            bw.close();//关闭文件
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(fileWriter != null) {
                fileWriter.close();
            }
            if(bw != null) {
                bw.close();
            }
        }
    }
}
