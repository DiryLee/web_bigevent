$(function () {
    // 调用用户基本信息函数
    getUserInfo()

    var layer = layui.layer
    // 退出绑定点击事件
    $('#btnlogOut').on('click', function () {
        layer.confirm('确定退出登录吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 清除token
            localStorage.removeItem('token')
            // 跳转到登录界面
            location.href = './login.html'

            // 关闭询问窗口
            layer.close(index);
        });
    })


})

// 用户基本信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },

        // 无论成功还是失败 都会调用complete函数
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转
        //         location.href = './login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)

    if (user.user_pic !== null) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
        $('.layui-nav-img').hide()
    }
}