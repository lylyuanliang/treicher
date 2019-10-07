package com.zoumi.treicher.common;

import com.zoumi.treicher.vo.TaskVo;
import com.zoumi.treicher.vo.TestingVo;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;

import java.util.Iterator;
import java.util.List;

public class RowRelated {

    /**
     * 获取行
     * @param sheet
     * @return
     */
    public Sheet getRow(Sheet sheet, List<TestingVo> dataList) {
        //构建每行的数据内容
        int rowNum = 1;
        for (Iterator<TestingVo> it = dataList.iterator(); it.hasNext(); ) {
            TestingVo data = it.next();
            if (data == null) {
                continue;
            }
            rowNum = convertDataToRow(data, sheet, rowNum);
        }
        for(int i=0; i< rowNum; i+=2) {
            CellRangeAddress region = new CellRangeAddress(i+1, i+2, 0, 0);
            sheet.addMergedRegion(region);
        }
        return sheet;
    }

    /**
     * 将数据转换成行
     * @param data 源数据
     * @return
     */
    private int convertDataToRow(TestingVo data,  Sheet sheet, int rowNum){
        String testNum = data.getTestNum();
        List<TaskVo> taskVoList = data.getTaskVoList();
        for(TaskVo taskVo: taskVoList) {
            Row row = sheet.createRow(rowNum++);
            int cellNum = 0;
            String commonality = taskVo.getCommonality();
            String other = taskVo.getOther();
            String personal = taskVo.getPersonal();
            String roundNum = taskVo.getRoundNum();
            Cell cell = row.createCell(cellNum ++);
            cell.setCellValue(testNum);

            cell = row.createCell(cellNum ++);
            cell.setCellValue(roundNum);

            cell = row.createCell(cellNum ++);
            cell.setCellValue(personal);

            cell = row.createCell(cellNum ++);
            cell.setCellValue(commonality);

            cell = row.createCell(cellNum ++);
            cell.setCellValue(getCommonalityPersonal(personal, other));

            cell = row.createCell(cellNum ++);
            cell.setCellValue(other);
        }

        return rowNum;
    }

    private String getCommonalityPersonal(String personal, String other) {
        int total = 50;
        int common = total - Integer.parseInt(personal) - Integer.parseInt(other);

        return String.valueOf(common);
    }
}
