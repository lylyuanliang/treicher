/**
 * 表单校验
 *      使用说明：页面要校验的元素上面加上zm-verify="demo"
 *                在js中1、validObj = new Valid({demo: (item) => {
 *                                          //item为属性zm-verify所在的挡墙元素
 *                                              .....
 *                                      });
 *                      2、提交时执行 validObj.submit(callback, currentPage);
 */
export default class Valid {
    constructor(validMethods) {
        this.validMethods = validMethods;
        return this;
    }

    /**
     * 表单验证
     * @param callback 提交回调函数
     * @param currentPage
     * @returns {boolean}
     */
    submit(callback, currentPage) {
        //增加表单验证
        //获取当前页面下需要验证的表单
        let zmValid = $(`[name=${currentPage}] [zm-verify]`);
        let flag = true;
        $.each(zmValid, (index, valid) => {
            let validFunctionName = $(valid).attr("zm-verify");
            //转成方法
            let validFunction = this.validMethods[validFunctionName];
            if(typeof validFunction === "function") {
                //执行校验方法
                if(!(flag = validFunction(valid))) {
                    //有校验不通过的，直接中断循环
                    return false;
                };
            }
        });
        if(!flag) {
            return false;
        }

        if(typeof callback === "function") {
            callback.call();
        }
        return true;
    }
}