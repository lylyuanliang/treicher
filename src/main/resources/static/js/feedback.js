import Common from "./common/common.js";
import Constants from "./common/constants.js";
import VirtualDataUtil from "./common/virtualDataUtil.js";

/**
 * js执行入口
 */

layui.use(["element", "form"], function () {
    let feedback = new Feedback();
    feedback.init();
});

class Feedback {
    constructor() {
        this.getTestingDataUrl = Common.getContextPath() + "/getTestingData";
        this.exportUrl = Common.getContextPath() + "/export";
        this.clear = Common.getContextPath() + "/clear";
    }

    /**
     * 初始化
     */
    init() {
        this.showFeedback();
        this.getTestingData();
        this.bindEvent();
        this.exportData = [];
    }

    bindEvent() {
        let _this = this;
        $("#feedback-next").on("click", () => {
            this.toEnd();
        });

        $("#next-person").on("click", function () {
            //清空数据
            Common.$ajax({
                url: _this.clear,
                type: "get",
                data: {},
                success(data) {
                    let rtnCode = data["returnCode"];
                    if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                        window.location.href = Common.getContextPath() + "/";
                    }else {
                        Common.showMessage(data["returnMessage"]);
                    }
                }
            });
        });
    }

    /**
     * 去结束页面
     */
    toEnd() {
        let exportData = this.exportData;
        let _this = this;
        Common.$ajax({
            url: this.exportUrl,
            type: "post",
            data: {exportData: JSON.stringify(exportData)},
            success(data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    Common.showMessage("导出成功");
                    $("[name=feedback]").hide();
                    $("[name=button]").hide();
                    $("[name=end]").show();
                }else {
                    Common.showMessage(data["returnMessage"]);
                }
            }
        });
    }

    /**
     * 反馈页面显示
     */
    showFeedback() {
        $("[name=feedback]").show();
        $("[name=end]").hide();
        $("[name=button]").show();
    }

    /**
     * 获取是实验数据
     */
    getTestingData() {
        let _this = this;
        Common.$ajax({
            url: this.getTestingDataUrl,
            type: "get",
            data: {},
            success(data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    // Common.showMessage("成功");
                    let testingDataList = data["data"];
                    if(!testingDataList || testingDataList.length <=0) {
                        Common.showMessage("无数据");
                    }else {
                        _this.buildTable(testingDataList);
                    }
                }else {
                    Common.showMessage(data["returnMessage"]);
                }
            }
        });
    }

    /**
     * 绘制表格
     * @param testingDataList
     */
    buildTable(testingDataList) {
        let length = testingDataList.length;
        let _this = this;
        $("#feedback-detail").html("");
        //导出用
        let testingVoList = [];
        $.each(testingDataList, function (index, testingVo) {
            let testNum = testingVo["testNum"];
            let userNum = testingVo["userNum"];
            let taskVoList = testingVo["taskVoList"];

            //获取公共池总数
            let commonalityTotal = VirtualDataUtil.getCommonalityTotal(userNum, testNum);
            //第二轮虚拟反馈数据
            let commonalityFeedbackVirtualData = VirtualDataUtil.getCommonalityFeedbackVirtualData(testNum);
            //taskVoListExport 导出用
            let taskVoListExport = [];
            $.each(taskVoList, function (i, taskVo) {
                let tr = $("<tr></tr>");
                let commonality = taskVo["commonality"];
                let other = taskVo["other"];
                let personal = taskVo["personal"];
                let roundNum = taskVo["roundNum"];

                commonalityTotal += parseInt(commonality);

                if(roundNum == 1) {
                    tr.append($(`<td rowspan="2" class="text-center">
                                    <p>${testNum}</p>
                                </td>`));
                }
                tr.append($(`<td class="text-center">
                                    <p>${roundNum}</p>
                                </td>
                                <td class="text-center">
                                    <p>${personal}</p>
                                </td>`));
                if(roundNum == 2) {
                    tr.append($(`<td class="text-center">
                                    <p>${commonalityFeedbackVirtualData}</p>
                                </td>`));
                }else {
                    tr.append($(`<td class="text-center">
                                    <p>${commonalityTotal}</p>
                                </td>`));
                }
                $("#feedback-detail").append(tr);

                let taskVoExport = _this.creatTaskVoTotal(commonalityTotal, personal, roundNum, commonalityFeedbackVirtualData, other);
                taskVoListExport.push(taskVoExport);
            });

            let testingVoExport = _this.createTestingVoTotal(testNum, taskVoListExport);
            testingVoList.push(testingVoExport);
        });
        this.exportData = testingVoList;
    }

    /**
     * 创建总的taskVo,为导出 做准备
     * @param commonalityTotal
     * @param personal
     * @param roundNum
     */
    creatTaskVoTotal(commonalityTotal, personal, roundNum, commonalityFeedbackVirtualData, other) {
        return roundNum == 1 ? {
            personal: personal,
            commonality: commonalityTotal,
            roundNum: roundNum,
            other: other
        } : {
            personal: personal,
            commonality: commonalityFeedbackVirtualData,
            roundNum: roundNum,
            other: other
        }
    }

    /**
     * 创建TestingVoTotal
     * @param testNum
     * @param taskVoListExport
     */
    createTestingVoTotal(testNum, taskVoListExport) {
        return {
            testNum: testNum,
            taskVoList: taskVoListExport
        }
    }
}