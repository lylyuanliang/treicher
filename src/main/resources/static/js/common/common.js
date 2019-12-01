export default class Common {
    /**
     * ajax定义
     *      可以只传路径或只传ajax参数配置
     * @param url 请求路径
     * @param options ajax参数配置
     */
    static $ajax(url) {
        let _this = this;
        let options = {};
        if ( typeof url === "object" ) {
            options = url;
        }
        //设置默认值
        options.type = options.type || "GET";
        options.dataType = options.dataType || "json";
        options.success = options.success || function(data) {
            _this.showMessage(data);
        };
        //调用jq ajax
        return $.ajax(options);
    }

    /**
     * 弹出层方法重载
     *      注：这个方法目前依赖layer，后续需要改造
     * @param message
     */
    static showMessage(message) {
        layer.msg(message);
    }

    /**
     * 获取应用上下文
     * @returns {string}
     */
    static getContextPath(){
        let pathName = window.document.location.pathname;
        let contextPath = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return contextPath;
    }

    /**
     * 返回 min（包含）～ max（包含）之间的数字
     * @param min
     * @param max
     * @returns {*}
     */
    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    /**
     * 获取实验信息
     */
    static getTestingInfo(callback) {
        Common.$ajax({
            url: Common.getContextPath() + "/getTestingInfo",
            type: "get",
            data: {},
            success: callback
        });
    }

    /**
     * 设置实验信息
     * @param callback
     */
    static setTestingInfo(param, callback) {
        Common.$ajax({
            url: Common.getContextPath() + "/setTestingInfo",
            type: "post",
            data: param,
            success: callback
        });
    }

    /**
     * 随机打乱数组
     * @param array
     */
    static randomArray(array) {
        let i = array.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [array[j], array[i]] = [array[i], array[j]];
        }
        return array;
    }
}