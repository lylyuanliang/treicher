/**
 * 底部按钮事件
 */
import Router from "../common/router.js";
export default class Button {
    constructor() {
        this.currentPageNum4Init = 1;
        //“按钮部分” class名称
        this.buttonPartsClass = ".button-parts";
        this.attr4currentPageNum = "current-page";
        //左 按钮 class
        this.buttonLeftClassName = "button-left";
        this.buttonLeftClass = ".button-left";
        //右 按钮 class
        this.buttonRightClassName = "button-right";
        this.buttonRightClass = ".button-right";
        //事件委托父节点
        this.parentNode = "body";
        this.buttonNode = "button";
        this.name = $("body").attr("name");
    }

    /**
     * 初始化方法
     */
    init(valid) {
        $(this.buttonPartsClass).attr(this.attr4currentPageNum, this.currentPageNum4Init);
        //初始化事件
        this.bindEvent4Click();
        let currentPage = Router.getRouterPathByPageNum(this.name, this.currentPageNum4Init);
        this.gotoPage(currentPage);
        this.valid = valid;
    }

    /**
     * 绑定点击事件
     */
    bindEvent4Click() {
        let _this = this;
        let buttonLeftClassName = this.buttonLeftClassName;
        let buttonRightClassName = this.buttonRightClassName;
        $(this.parentNode).on("click", this.buttonNode, function () {
            //按钮的父节点
            let parent = $(this).parent();
            let className = parent.attr("class");
            //按钮父节点的父节点
            let granpa = parent.parent();
            //获取当前页码
            let currentPageNum = granpa.attr(_this.attr4currentPageNum);
            let currentPage = Router.getRouterPathByPageNum(_this.name, currentPageNum);
            if(buttonLeftClassName == className) {
                //上一页
                currentPageNum --;
            }else if(buttonRightClassName == className) {
                //下一页
                currentPageNum ++;
                //对当前页 逻辑校验
                if(!_this.validMethod(currentPage)) {
                    return ;
                }
            }else {
                //异常分支。暂不处理
            }
            currentPageNum = currentPageNum < _this.currentPageNum4Init ? _this.currentPageNum4Init : currentPageNum;
            let targetPage = Router.getRouterPathByPageNum(_this.name, currentPageNum);
            if(currentPage != targetPage) {
                //修改button域当前的页码记录
                $(_this.buttonPartsClass).attr(_this.attr4currentPageNum, currentPageNum);
                _this.gotoPage(currentPage, targetPage);
            }
        });
    }

    /**
     * 校验
     * @param currentPage
     * @returns {boolean}
     */
    validMethod(currentPage) {
        if(this.valid[`${currentPage}Valid`]) {
            return this.valid[`${currentPage}Valid`].call();
        }
        return true;
    }

    /**
     * 页面 “跳转”
     *      这里当然不是跳转，只是页面显示与隐藏而已
     * @param currentPage
     * @param targetPage
     */
    gotoPage(currentPage, targetPage) {
        if(arguments.length > 1 && targetPage) {
            $(`[name=${currentPage}]`).hide();
            $(`[name=${targetPage}]`).show();
        }else {
            $(`[name=${currentPage}]`).show();
        }
        this.hideButton();
    }

    /**
     * 隐藏按钮
     */
    hideButton() {
        $(this.buttonLeftClass).css("visibility", "visible");
        $(this.buttonRightClass).css("visibility", "visible");
        let currentPageNum = $(this.buttonPartsClass).attr(this.attr4currentPageNum);
        if(Router.getFirstPage(this.name) == currentPageNum) {
            //第一页，隐藏“上一页”按钮
            $(this.buttonLeftClass).css("visibility", "hidden");
        }else if(Router.getLastPage(this.name) == currentPageNum) {
            //最后一页，隐藏“下一页”按钮
            $(this.buttonRightClass).css("visibility", "hidden");
        }
    }
}