/**
 * js执行入口
 */
layui.use(["element", "form"], function () {
    //这句代码不能删
    let form = layui.form;
    let index = new Index();
    index.init();
});

import Button from "./pagejs/button.js";
import Check from "./pagejs/check.js"
class Index {
    constructor() {
        this.valid = {};
    }

    /**
     * 初始化
     */
    init() {
        let button = new Button();
        let check = new Check();
        button.init(this.valid);
        check.init(this.valid);
    }
}