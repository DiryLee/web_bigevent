$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户名必须在1~6个字符之间'
            }
        }
    })

    initUserInfo()

    // 初始化用户信息函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                // console.log(res)
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })

        // 为重置按钮绑定点击事件
        $('#btnReset').on('click', function (e) {
            // 阻止默认重置行为
            e.preventDefault()
            initUserInfo()
        })

        // 表单绑定提交事件
        $('.layui-form').on('submit', function (e) {
            // 默认阻止表单提交行为
            e.preventDefault()
            // 发起POST请求
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('更新用户信息失败')
                    }
                    layer.msg('更新用户数据成功')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                    window.parent.getUserInfo()
                }
            })
        })
    }

})