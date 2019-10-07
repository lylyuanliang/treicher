package com.zoumi.treicher.common;

import com.alibaba.fastjson.JSONObject;
import com.zoumi.treicher.vo.TaskVo;
import com.zoumi.treicher.vo.TestingVo;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Excel 工具类
 *   （POI）
 */
public class ExcelUtil {
    private static final Logger LOG = LoggerFactory.getLogger(RowRelated.class);

    private static final RowRelated ROW_RELATED = new RowRelated();

    /**
     * 生成Excel并写入数据信息
     * @param dataList 数据列表
     * @return 写入数据后的工作簿对象
     */
    public static boolean exportData(List<TestingVo> dataList, List<String> cellHeads, String path, String fileName){
        LOG.info("需要导出的数据为：{}" + JSONObject.toJSONString(dataList));

        // 生成xlsx的Excel
        Workbook workbook = new SXSSFWorkbook();

        // 如需生成xls的Excel，请使用下面的工作簿对象，注意后续输出时文件后缀名也需更改为xls
        //Workbook workbook = new HSSFWorkbook();

        // 生成Sheet表，写入第一行的列头
        Sheet sheet = buildDataSheet(workbook, cellHeads);

        sheet = ROW_RELATED.getRow(sheet, dataList);

        FileOutputStream fileOut = null;
        try {
            String exportFilePath = path + "/" + fileName;
            File exportFile = new File(exportFilePath);
            if (!exportFile.exists()) {
                exportFile.createNewFile();
            }

            fileOut = new FileOutputStream(exportFilePath);
            workbook.write(fileOut);
            fileOut.flush();
            return true;
        } catch (Exception e) {
            LOG.error("输出Excel时发生错误，错误原因：" + e.getMessage());
        } finally {
            try {
                if (null != fileOut) {
                    fileOut.close();
                }
                if (null != workbook) {
                    workbook.close();
                }
            } catch (IOException e) {
                LOG.error("关闭输出流时发生错误，错误原因：" + e.getMessage());
            }
        }

        return false;
    }

    /**
     * 生成sheet表，并写入第一行数据（列头）
     * @param workbook 工作簿对象
     * @return 已经写入列头的Sheet
     */
    private static Sheet buildDataSheet(Workbook workbook, List<String> cellHeads) {
        Sheet sheet = workbook.createSheet();
        // 设置列头宽度
        for (int i=0; i<cellHeads.size(); i++) {
            sheet.setColumnWidth(i, 4000);
        }
        // 设置默认行高
        sheet.setDefaultRowHeight((short) 400);
        // 构建头单元格样式
        CellStyle cellStyle = buildHeadCellStyle(sheet.getWorkbook());
        // 写入第一行各列的数据
        Row head = sheet.createRow(0);
        for (int i = 0; i < cellHeads.size(); i++) {
            Cell cell = head.createCell(i);
            cell.setCellValue(cellHeads.get(i));
            cell.setCellStyle(cellStyle);
        }
        return sheet;
    }

    /**
     * 设置第一行列头的样式
     * @param workbook 工作簿对象
     * @return 单元格样式对象
     */
    private static CellStyle buildHeadCellStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        //对齐方式设置
        style.setAlignment(HorizontalAlignment.CENTER);
        //边框颜色和宽度设置
        style.setBorderBottom(BorderStyle.THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex()); // 下边框
        style.setBorderLeft(BorderStyle.THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex()); // 左边框
        style.setBorderRight(BorderStyle.THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex()); // 右边框
        style.setBorderTop(BorderStyle.THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex()); // 上边框
        //设置背景颜色
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //粗体字设置
        Font font = workbook.createFont();
        font.setBold(true);
        style.setFont(font);
        return style;
    }


    public static void main(String[] args) {
        // 创建需要写入的数据列表
        List<TestingVo> dataVOList = new ArrayList<>(2);
        TestingVo testingVo = new TestingVo();

        List<TaskVo> taskVoList = new ArrayList<>();

        TaskVo taskVo = new TaskVo();
        taskVo.setRoundNum("1");
        taskVo.setCommonality("1");
        taskVo.setOther("1");
        taskVo.setPersonal("1");

        TaskVo taskVo2 = new TaskVo();
        taskVo2.setRoundNum("12");
        taskVo2.setCommonality("12");
        taskVo2.setOther("12");
        taskVo2.setPersonal("12");

        taskVoList.add(taskVo);
        taskVoList.add(taskVo2);

        testingVo.setTaskVoList(taskVoList);
        testingVo.setTestNum("1");

        dataVOList.add(testingVo);

        // 写入数据到工作簿对象内
        boolean flag = ExcelUtil.exportData(dataVOList, OtherConstants.Excel.CELL_HEADS_TESTING, "C:/Users/liurl/Desktop/zm/", "writeExample.xlsx");
    }
}
