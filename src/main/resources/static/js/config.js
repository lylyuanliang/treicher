import Common from "./common/common.js";
import Constants from "./common/constants.js";

layui.use('upload', function () {
    let $ = layui.jquery
        , upload = layui.upload;
    let url = Common.getContextPath() + "/upload";
    //多文件列表示例
    var demoListView = $('#demoList')
    //拖拽上传
    upload.render({
        elem: '#config'
        , url: url //改成您自己的上传接口
        , accept: "file"
        , auto: false //选择文件后不自动上传
        , bindAction: '#testListAction'
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layer.load(); //上传loading
        }
        , choose: function (obj) {
            let files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
            obj.preview(function (index, file, result) {
                let tr = $(['<tr id="upload-' + index + '">'
                    , '<td>' + file.name + '</td>'
                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                    , '<td>等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    file["name"] = file["name"] + "?" + $("#realNums").val();
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
                let realNums = $("#realNums").val();
                let fileName = file["name"];
                obj.resetFile(index, file, fileName + "?" + realNums); //重命名文件名，layui 2.3.0 开始新增
            });
        }
        , done: function (res, index, upload) {
            layer.closeAll('loading'); //关闭loading
            let returnCode = res["returnCode"];
            if (Constants.RTN_CODE.SUCCESS == returnCode) {
                Common.showMessage("上传成功");
                let tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(3).html(''); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            } else {
                Common.showMessage(res["returnMessage"]);
                this.error(index, upload);
            }
        }
        , error: function (index, upload) {
            layer.closeAll('loading'); //关闭loading
            let tr = demoListView.find('tr#upload-' + index)
                , tds = tr.children();
            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
        }
    });
})
