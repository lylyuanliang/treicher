/**
 * 准备
 */
import Common from "../common/common.js";
import Constants from "../common/constants.js";
import Waiting from "./waiting.js";

export default class Testing {
    /**
     * 构造函数
     */
    constructor(tips) {
        //任务开始之前，获得50个任务币
        this.total = 50;
        this.submitUrl = Common.getContextPath() + "/submit";
        //试次
        this.testNum = 0;
        //轮次
        this.roundNum = 0;
        //初始化waiting对象
        this.waiting = new Waiting();
        //userNum去看treicher.html页面底部
        this.userNum = 0;

        this.tips = tips;
    }

    init(valid) {
        this.bindClick4Button();
        this.bindEvent4Input();
        $("#other").val(this.total);
        this.waiting.init();

        this.testNum = this.tips.testNum;
        this.roundNum = this.tips.roundNum;
        this.userNum = this.tips.userNum;
    }

    /**
     * 绑定事件
     */
    bindClick4Button() {
        $("#testing-submit").on("click", () => {
            this.submit();
        });
    }

    /**
     * 为input绑定事件
     */
    bindEvent4Input() {
        let _this = this;
        $("#commonality").on("keyup", function () {
            _this.checkInput($(this), $("#personal"));
        });

        $("#personal").on("keyup", function () {
            _this.checkInput($(this), $("#commonality"));
        });
    }

    /**
     * 校验输入
     * @param $InputSelectorO 正在操作的input jq对象
     * @param $InputSelector  没有操作的input jq对象
     */
    checkInput($InputSelectorO, $InputSelector) {
        //另一个池已投入的币数量
        let puted = $InputSelector.val();
        puted = puted ? puted : 0;

        let leave = this.total - puted;
        //正在投入的币数量
        let puting = $InputSelectorO.val();

        if(isNaN(puting)) {
            Common.showMessage("请输入数字");
            $InputSelectorO.val("");
            $("#other").val(leave);
            return ;
        }

        if(puting > leave) {
            Common.showMessage(`最多还能投入${leave}个任务币`);
            $InputSelectorO.val("");
            $("#other").val(leave);
            return ;
        }

        $("#other").val(leave - puting);
    }

    /**
     * 提交
     */
    submit() {
        let personal = $("#personal").val();
        let commonality = $("#commonality").val();
        let other = $("#other").val();

        if(!this.valid()) {
            return ;
        }

        personal = personal ? personal : 0;
        commonality = commonality ? commonality : 0;

        let sum = parseInt(personal) + parseInt(commonality) + parseInt(other);
        if(sum != this.total) {
            Common.showMessage("任务币总数不对，请确认");
            return ;
        }

        let testNum = $("[name=testNum]").text();
        let roundNum = $("[name=roundNum]").text();
        this.testNum = testNum;
        this.roundNum = roundNum;

        //请求参数
        let params = {
            //个人池任务币数量
            personal: personal,
            //公共池任务币数量
            commonality: commonality,
            //剩下任务币数量
            other: other,
            //试次
            testNum: this.testNum,
            //轮次
            roundNum: this.roundNum
        };
        let _this = this;

        Common.$ajax({
            url: this.submitUrl,
            type: "post",
            data: params,
            success(data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    Common.showMessage("提交成功");
                    $("#commonality").val("");
                    $("#personal").val("");
                    $("#other").val(_this.total);
                    if(_this.roundNum == 2) {
                        //当前第二轮，直接进入下一试次
                        _this.toNextWaiting();
                    }else if(_this.roundNum == 1) {
                        _this.toWaiting(personal, commonality, other, testNum);
                    }
                }else {
                    Common.showMessage(data["returnMessage"]);
                }
            }
        });

    }

    /**
     * 检验
     * @returns {boolean}
     */
    valid() {
        let personal = $("#personal").val();
        let commonality = $("#commonality").val();
        if(!personal && personal != "0") {
            Common.showMessage("请投入个人池任务币，如果不投，请输入0");
            return false;
        }
        if(!commonality && commonality != "0") {
            Common.showMessage("请投入公共池任务币，如果不投，请输入0");
            return false;
        }
        return true;
    }

    /**
     * 显示等待页面
     */
    toWaiting(personal, commonality, other, testNum) {
        $("[name=testing]").hide();
        $("[name=waiting]").show();
        this.hideButtonParts()

        //去结果页面
        this.waiting.toResult(personal, commonality, other, testNum);
    }

    /**
     * 下一试次
     */
    toNextWaiting() {
        $("[name=testing]").hide();
        $("[name=next-testing]").show();
        if(this.testNum >= Constants.MAX_TEST_NUM) {
            $("#next-testing").html("查看最终结果");
        }
    }

    /**
     * 隐藏按钮部分
     */
    hideButtonParts() {
        $(".button-parts").hide();
    }
}