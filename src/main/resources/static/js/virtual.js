import Common from "./common/common.js";
import Constants from "./common/constants.js";
import VirtualDataUtil from "./common/virtualDataUtil.js";

/**
 * js执行入口
 */

layui.use(["element", "form"], function () {
    let virtual = new Virtual();
    virtual.init();
});

class Virtual {
    constructor() {
        //virtualRes 这个值通过tymeleaf获取，在virtual.html底部
        this.virtualRes = virtualRes;
        this.realTestNums = realTestNums;
    }

    bindEvent() {
        $("#sure").on("click", () => {
            this.showResult();
        });
        $("#close").on("click", () => {
            $("#result").hide();
        });
    }

    /**
     * 创建表格
     * @param personal 个人池投入
     * @param commonality 公共池投入
     * @param other 剩余
     * @param testNum 试次
     */
    showResult() {
        let testNum = $("#testNum").val();
        let personNum = $("#personNum").val();

        if(!testNum || !personNum) {
            return ;
        }
        personNum = parseInt(personNum) % this.realTestNums;
        //数据编号，从1到5
        let pNum = 1;
        let tBody = $("#result tbody");
        tBody.html("");
        for (let i = 0; i < 5; i++) {
            let virtualDataDetail = VirtualDataUtil.getVirtualDataDetailAnother(personNum, testNum, pNum++);
            let commonalityVirtual = virtualDataDetail.COMMONALITY;
            let personalVirtual = virtualDataDetail.PERSONAL;
            tBody.append($(`<tr>
                                <td class="text-center">${i+1}</td>
                                <td class="text-center">${commonalityVirtual}</td>
                                <td class="text-center">${personalVirtual}</td>
                            </tr>`));
        }
        $("#result").show();
    }


    /**
     * 初始化
     */
    init() {
        this.buildTable(this.virtualRes);
        this.bindEvent();
    }

    /**
     * 绘制表格
     * @param testingDataList
     */
    buildTable(virtualRes) {
        let _this = this;
        let res = JSON.parse(virtualRes);
        let rtnCode = res["returnCode"];
        if(Constants.RTN_CODE.SUCCESS != rtnCode) {
            Common.showMessage(res["returnMessage"]);
        }else {
            _this.showFeedback();
            let data = res["data"];
            data = JSON.parse(data);
            $("#virtual-detail").html("");
            $.each(data, function (index, testingDataVo) {
                let sequenceNum = testingDataVo["sequenceNum"];
                let testingDataVos = testingDataVo["testingDataVos"];
                let tr = $("<tr class='border-top-strong border-left-strong border-right-strong'></tr>");
                let length = testingDataVos.length;
                tr.append($(`<td rowspan="${length}" class="text-center border-bottom-strong">
                                    <p>${sequenceNum}</p>
                                </td>`));
                $.each(testingDataVos, function (i, testingDataVo) {
                    let commonality = testingDataVo["commonality"];
                    let personNum = testingDataVo["personNum"];
                    let personal = testingDataVo["personal"];

                    if(i > 0 && i != length-1) {
                        tr = $("<tr class='border-right-strong'></tr>");
                    }else if(i > 0 && i == length-1) {
                        tr = $("<tr class='border-right-strong border-bottom-strong'></tr>");
                    }

                    tr.append($(`<td class="text-center">
                                    <p>${personNum}</p>
                                </td>
                                <td class="text-center">
                                    <p>${commonality}</p>
                                </td>
                                <td class="text-center">
                                    <p>${personal}</p>
                                </td>`));

                    $("#virtual-detail").append(tr);
                });
            });
        }
    }

    /**
     * 页面显示
     */
    showFeedback() {
        $("[name=virtual]").show();
    }
}