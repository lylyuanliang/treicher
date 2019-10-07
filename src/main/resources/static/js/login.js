/**
 * js执行入口
 */
layui.use(["element", "layer"], function () {
    let login = new Login();
    login.init();
});

import Common from "./common/common.js";
import Constants from "./common/constants.js";
class Login {
    constructor() {
        this.contextPath = Common.getContextPath();
        this.loginUrl = `${this.contextPath}/doLogin`;
        this.logonUrl = `${this.contextPath}/doLogon`;
        this.enP = /^[\u4e00-\u9fa5]+$/;
    }

    /**
     * 初始化
     */
    init() {
        this.bindClick4Button();
        //粒子背景特效
       /* $('body').particleground({
            dotColor: '#E8DFE8',
            lineColor: '#133b88'
        });*/
        this.showLoginPage();
    }

    /**
     * 给按钮绑定点击事件
     */
    bindClick4Button() {
        //登录
        $("body").on("click", "#login", () => {
            this.login();
        });
        //注册
        $("body").on("click", "#logon", () => {
            //展示注册页面
            this.showLogonPage();
        });
        //注册
        $("body").on("click", "#back", () => {
            //展示登陆页面
            this.showLoginPage();
        });
        $("body").on("click", "#do-logon", () => {
            //展示注册页面
            this.logon();
        });
    }

    /**
     * 登录
     */
    login() {
        let userName = $("[name=login] [name=username]").val();
        let password = $("[name=login] [name=password]").val();
        if(!userName) {
            Common.showMessage("请输入昵称");
            return ;
        }
        if (!this.enP.test(userName)) {
            Common.showMessage("请输入中文");
            return false;
        };
        if(!password) {
            Common.showMessage("请输入密码");
            return ;
        }
        let _this = this;
        let param = {
            userName: userName,
            password: password
        };
        Common.$ajax({
            url: this.loginUrl,
            type: "post",
            data: param,
            success(data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    // Common.showMessage("成功");
                    //每次登陆都是第一试次第一轮
                    Common.setTestingInfo({testNum: 1, roundNum: 1}, function (res) {
                        let resCode = res["returnCode"];
                        if(Constants.RTN_CODE.SUCCESS != resCode) {
                            Common.showMessage(res["returnMessage"]);
                        }
                    });
                    _this.gotoTransitionPage();
                }else {
                    Common.showMessage(data["returnMessage"]);
                }
            }
        });
    }

    /**
     * 注册
     */
    logon() {
        let userName = $("[name=logon] [name=username]").val();
        let password = $("[name=logon] [name=password]").val();
        let passwordConfirm = $("[name=logon] [name=password2]").val();

        if(!userName) {
            Common.showMessage("请输入昵称");
            return ;
        }
        if (!this.enP.test(userName)) {
            Common.showMessage("请输入中文");
            return false;
        };
        if(!password) {
            Common.showMessage("请输入密码");
            return ;
        }
        if(!passwordConfirm) {
            Common.showMessage("请输入确认密码");
            return ;
        }

        if(password != passwordConfirm) {
            Common.showMessage("两次输入密码不一致，请确认");
            return ;
        }

        let param = {
            userName: userName,
            password: password
        };
        let _this = this;
        Common.$ajax({
            url: this.logonUrl,
            type: "post",
            data: param,
            success(data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    Common.showMessage("注册成功");
                    _this.showLoginPage();
                }else {
                    Common.showMessage(data["returnMessage"]);
                }

            }
        });
    }

    /**
     * 显示登陆页面
     */
    showLoginPage() {
        $("[name=login]").show();
        $("[name=logon]").hide();
    }

    /**
     * 显示注册页面
     */
    showLogonPage() {
        $("[name=logon]").show();
        $("[name=login]").hide();
    }

    /**
     * 去实验页
     */
    gotoTransitionPage() {
        window.location.href = `${Common.getContextPath()}/transition`;
    }
}