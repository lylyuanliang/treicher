/**
 * 结果
 */
import VirtualDataUtil from "../common/virtualDataUtil.js";
import Common from "../common/common.js";
import Constants from "../common/constants.js";

export default class Result {
    /**
     * 构造函数
     */
    constructor() {
        //userList 这个变量的值在treicher.html底部
        this.userList = userList;
        //currentUser 这个变量的值在treicher.html底部
        this.currentUser = currentUser;
        this.indexInit = 1;
    }

    init(valid) {
        this.bindEvent();
        let _this = this;
        //获取实验信息
        Common.getTestingInfo(function (data) {
            let rtnCode = data["returnCode"];
            if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                let res = data["data"];
                let testNum = res["testNum"];
                let roundNum = res["roundNum"];
                let userNum = res["userNum"];

                _this.userNum = userNum;
            }
        });
    }

    /**
     * 事件绑定
     */
    bindEvent() {
        let _this = this;
        $("body").on("click", "#next-round", function () {
            //下一轮
            _this.toTesting();
        });
    }

    /**
     * 去实验页面
     */
    toTesting() {
        Common.getTestingInfo(function (data) {
            let rtnCode = data["returnCode"];
            if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                let res = data["data"];
                let testNum = res["testNum"];
                let roundNum = res["roundNum"];
                roundNum ++;
                //设置实验信息 ，第testNum+1试次，第一轮
                //第一试次第二轮
                Common.setTestingInfo({testNum: testNum, roundNum: roundNum}, function (res) {
                    let resCode = res["returnCode"];
                    if(Constants.RTN_CODE.SUCCESS != resCode) {
                        Common.showMessage(res["returnMessage"]);
                    }else {
                        $("[name=testNum]").text(testNum);
                        $("[name=roundNum]").text(roundNum);
                        $("[name=ready]").hide();
                        $("[name=testing]").show();
                        $("[name=result]").hide();
                    }
                });
            }
        });
    }

    /**
     * 创建表格
     * @param personal 个人池投入
     * @param commonality 公共池投入
     * @param other 剩余
     * @param testNum 试次
     */
    buildTable(personal, commonality, other, testNum, number) {
        //公共池总共
        let commonalityTotal = parseInt(commonality);
        let length = this.userList.length;
        $("#result-detail").html("");
        $("#result-detail").append($(`<tr>
                            <td colspan="2">
                                <p>在上一轮<span><input value="(第${testNum}试次第1轮)" disabled>分配任务中：</p>
                            </td>
                        </tr>`));
        //数据编号，从1到5
        let pNum = 1;
        let userList = this.getUserList4Random(this.userList);
        $.each(userList, (index, userInfo) => {
            //获取虚拟数据
            let userName = userInfo.userName;
            let tr = $("<tr></tr>");
            if (index == 0) {
                let td1 = $(`<td rowspan="${length}"></td>`);
                tr.append(td1);
            }
            let td;
            if (userName != this.currentUser) {
                let virtualDataDetail = VirtualDataUtil.getVirtualDataDetailAnother(this.userNum, testNum, pNum++);
                let commonalityVirtual = virtualDataDetail.COMMONALITY;
                let personalVirtual = virtualDataDetail.PERSONAL;
                commonalityTotal += parseInt(commonalityVirtual);
                td = $(`<td><span>${userName}</span>向公共池投入<input value="${commonalityVirtual}">个，向个人池投入<input value="${personalVirtual}">个</td>`);
            } else {
                td = $(`<td><span>【你】</span>向公共池投入<input value="${commonality}">个，向个人池投入<input value="${personal}">个</td>`);
            }
            tr.append(td);
            $("#result-detail").append(tr);
        });
        $("#result-detail").append($(`<tr>
                                <td colspan="2" class="text-center">
                                    <p>公共池累积<input value="${commonalityTotal}">个</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center">
                                    <button type="button" id="next-round" class="layui-btn layui-btn-radius layui-btn-sm">下一轮</button>
                                </td>
                            </tr>`));
    }

    /**
     * 将userList数组碎甲打乱
     * @param userList
     */
    getUserList4Random(userList) {
        let list = Common.randomArray(userList);
        let loginUserIndex = 0;
        let length = list.length;
        $.each(list, (i, o) => {
            if(this.currentUser == o["userName"]) {
                loginUserIndex = i;
                return false;
            }
        });
        //将当前登录用户交换到数组末尾
        [list[loginUserIndex], list[length-1]] = [list[length-1], list[loginUserIndex]];
        return list;
    }
}