/**
 * js执行入口
 */
layui.use("element", function () {
    let element = layui.element;
    let transition = new Transition(element);
    transition.init()
});

import Common from "./common/common.js";
import Constants from "./common/constants.js";
class Transition {
    constructor(element) {
        this.element = element;
        this.contextPath = Common.getContextPath();
        this.indexUrl = `${this.contextPath}/index`;
        //进度条停留时间  2秒（2000ms）
        this.stop = 2000;
    }

    /**
     * 初始化
     */
    init() {
        this.bindClick4Button();
        this.hideProgress();
    }

    /**
     * 给按钮绑定点击事件
     */
    bindClick4Button() {
        $("body").on("click", "#start", () => {
            this.start();
        });

        $("body").on("click", "#ready", () => {
            this.gotoIndex();
        });

    }

    /**
     * 开始实验
     */
    start() {
        //隐藏按钮
        this.hideButton();
        this.showProgress();
        this.loading();
    }

    /**
     * 进度条加载
     *      只是一个模拟
     */
    loading(){
        let _this = this;
        //模拟loading
        let n = 0, timer = setInterval(function(){
            n = n + Math.random()*200|0;
            if(n>100){
                n = 100;
                clearInterval(timer);
                _this.hideProgress();
                _this.gotoTreicherPage();
            }
            _this.element.progress('pgr', n+'%');
        }, 500);
    }

    /**
     * 隐藏开始按钮
     */
    hideButton() {
        $("#start").hide();
    }

    /**
     * 显示准备按钮
     */
    showReadyButton() {
        $("[name=ready]").show();
    }

    /**
     * 进度条隐藏
     */
    hideProgress() {
        $(".progress").hide();
    }

    /**
     * 显示进度条
     */
    showProgress() {
        $(".progress").show();
    }

    /**
     * 去实验页
     */
    gotoTreicherPage() {
        window.location.href = `${Common.getContextPath()}/treicher`;
    }
}