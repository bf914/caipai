var submit_randrecipeing = 0;
$(function() {
    loadImage("http://www.meishij.net/static/images/msj_jindu.gif");
    $("#smt_guide ul li a").click(function() {
        var ml = $("#smt_guide ul").css("marginLeft");
        var len = ml.length - 2;
        var ml1 = ml.substring(0, len);
        $("#smt_guide ul").animate({
            "marginLeft": ( - 570 + parseInt(ml1)) + "px"
        },
        600, 
        function() {})
    });
    $("#smt_guide ul li span.step1").click(function() {
        $("#smt_guide ul").animate({
            "marginLeft": "0px"
        },
        600, 
        function() {})
    });
    $("#smt_guide ul li span.step2").click(function() {
        $("#smt_guide ul").animate({
            "marginLeft": "-570px"
        },
        600, 
        function() {})
    });
    $("#smt_guide ul li span.step3").click(function() {
        $("#smt_guide ul").animate({
            "marginLeft": "-1140px"
        },
        600, 
        function() {})
    });
    function smt_slideDown(ele) {
        ele.parent(".smt_left_li").find(".smt_left_li_list").show();
        ele.parent(".smt_left_li").siblings(".current").find(".smt_left_li_list").hide();
        ele.parent(".smt_left_li").siblings(".current").removeClass("current");
        ele.parent(".smt_left_li").addClass("current")
    }
    function smt_slideUp(ele) {
        ele.parent(".smt_left_li").find(".smt_left_li_list").hide();
        ele.parent(".smt_left_li").removeClass("current")
    }
    $(".smt_left_li_btn").click(function() {
        if ($(this).parent(".smt_left_li").hasClass("current")) {
            smt_slideUp($(this))
        } else {
            smt_slideDown($(this))
        }
    });
    $(".smt_srh_for_text #input_text").keypress(function(event) {
        if (event.keyCode == 13) {
            $(".smt_srh_for_submit input").click()
        }
    });
    $(".smt_left_li_list a").click(function() {
        if ($(this).hasClass("current")) {
            $(this).removeClass("current");
            var scid = $(this).attr("id") + "_choosed";
            $("#" + scid).remove();
            checkToHide();
            var smt_val = "";
            $.each($(".smt_chosed_option"), 
            function() {
                var len4 = $(this).attr("id").length;
                var _id = $(this).attr("id").substring(0, len4 - 8);
                smt_val += _id + ","
            });
            ajax_randrecipe(smt_val, 0, 1, 0)
        } else {
            var len1 = $(".smt_chosed_option").length;
            if (len1 > 4) {
                Alert("提示", "text:亲，最多5种食材哦，<br/>太多就成乱炖了：）", "250", "60", "false", "", "true", "text", "1");
                return
            } else {
                $(this).addClass("current");
                var txt = $(this).text();
                var scid = $(this).attr("id") + "_choosed";
                $(".smt_chosed").append("<a href='####' class='smt_chosed_option' id='" + scid + "'>" + txt + "</a>");
                checkToHide();
                var smt_val = "";
                $.each($(".smt_chosed_option"), 
                function() {
                    var len4 = $(this).attr("id").length;
                    var _id = $(this).attr("id").substring(0, len4 - 8);
                    smt_val += _id + ","
                });
                ajax_randrecipe(smt_val, 0, 1, 0)
            }
        }
        $(".tips_off").click(function() {
            $(this).parents(".mssx_pairs_tips").hide()
        })
    });
    $(".smt_ch_btn").click(function() {
        var smt_val = "";
        $.each($(".smt_chosed_option"), 
        function() {
            var len4 = $(this).attr("id").length;
            var _id = $(this).attr("id").substring(0, len4 - 8);
            smt_val += _id + ","
        });
        $("#smt_form_input_hidden").val(smt_val);
        $("#smt_form2").submit()
    });
    $(".smt_clear_sc").click(function() {
        $(".smt_chosed_option").remove();
        $(".smt_left_li_list a").removeClass("current");
        checkToHide()
    })
});
function submit_randrecipe() {
    var text = $("#input_text").val();
    if (submit_randrecipeing == 0) {
        if (text != '') {
            submit_randrecipeing = 1;
            $.get("/ajax/chishenme.php?c=" + encodeURIComponent(text), 
            function(data) {
                if (data != '') {
                    add_shicai(data)
                } else {
                    alert("换个食材再输入吧~")
                }
                $("#input_text").val('');
                submit_randrecipeing = 0
            })
        } else {
            alert("请输入食材~")
        }
    }
}
function ajax_randrecipe(ids, ti, page, is_simple) {
    if (is_simple == 0) {
        Alert("找菜ing...", "img:http://www.meishij.net/static/images/msj_jindu.gif", "250", "180", "false", "", "false", "img");
        $("#windown-close").hide()
    } else {
        Alert("找菜ing...", "img:http://www.meishij.net/static/images/msj_jindu.gif", "250", "180", "false", "", "false", "img");
        $("#windown-close").hide()
    }
    window.location.href = "#content";
    $.get("/ajax/chishenme_ids.php?shicai_ids=" + encodeURIComponent(ids) + "&ti=" + ti + "&page=" + page + "&is_simple=" + is_simple, 
    function(data) {
        $("#smt_guide").hide();
        if (is_simple == 0) {
            $("#randrecipe_result").html(data);
            if (data == "") {
                $("#smt_guide").show()
            }
            $("#windownbg").remove();
            $("#windown-box").fadeOut("slow", 
            function() {
                $(this).remove()
            })
        } else {
            $("#randrecipe_result").html(data);
            if (data == "") {
                $("#smt_guide").show()
            }
            $("#windownbg").remove();
            $("#windown-box").fadeOut("slow", 
            function() {
                $(this).remove()
            })
        }
    })
}
function ajax_combination(ids, ti, page) {
    window.location.href = "#content";
    Alert("找菜ing...", "img:http://www.meishij.net/static/images/msj_jindu.gif", "250", "180", "false", "", "false", "img");
    $("#windown-close").hide();
    $.get("/ajax/chishenme_ids.php?is_com=1&shicai_ids=" + encodeURIComponent(ids) + "&ti=" + ti + "&page=" + page, 
    function(data) {
        $("#smt_guide").hide();
        $("#randrecipe_result").html(data);
        if (data == "") {
            $("#smt_guide").show()
        }
        $("#windownbg").remove();
        $("#windown-box").fadeOut("slow", 
        function() {
            $(this).remove()
        })
    })
}
function add_shicai(data) {
    eval('var result = ' + data + ';');
    var arr = [];
    var pattern = /^[0-9]*[1-9][0-9]*$/;
    var flag,
    t_i_con;
    for (var i_con in result) {
        if (result[i_con] !== undefined) {
            flag = pattern.test(result[i_con]);
            if (flag == true) {
                t_i_con = parseInt(i_con) + 1;
                var len1 = $(".smt_chosed_option").length;
                if (len1 > 4) {
                    Alert("提示", "text:亲，最多5种食材哦，<br/>太多就成乱炖了：）", "250", "60", "false", "", "true", "text", "1");
                    return
                } else {
                    if ($('#' + result[i_con] + "_choosed").length == 0) {
                        if ($('#' + result[i_con]).length > 0) {
                            $('#' + result[i_con]).addClass("current")
                        }
                        var scid = result[i_con] + "_choosed";
                        $(".smt_chosed").append("<a href='####' class='smt_chosed_option' id='" + scid + "'>" + result[t_i_con] + "</a>")
                    }
                }
            }
        }
    }
    checkToHide();
    var smt_val = "";
    $.each($(".smt_chosed_option"), 
    function() {
        var len4 = $(this).attr("id").length;
        var _id = $(this).attr("id").substring(0, len4 - 8);
        smt_val += _id + ","
    });
    ajax_randrecipe(smt_val, 0, 1, 0)
}
function checkToHide() {
    var len2 = $(".smt_chosed_option").length;
    if (len2 < 1) {
        $(".smt_chosed_title").html("请选择食材：");
        $(".smt_clear_sc").hide();
        $(".smt_ch_btn").hide()
    } else {
        $(".smt_chosed_title").html("已选食材：");
        $(".smt_clear_sc").show();
        $(".smt_ch_btn").show()
    }
}
function loadImage(url) {
    var img = new Image();
    img.onload = function() {
        img.onload = null
    }
    img.src = url
}
function bind_con1_sc() {
    $(".smt_con1_title span").hover(function() {
        $(this).find(".del").show()
    },
    function() {
        $(this).find(".del").hide()
    });
    $(".smt_con1_title em.del").click(function() {
        var idfordel = $(this).attr("scid");
        if (idfordel) {
            $(this).parent("span").remove();
            $("#" + idfordel).click()
        } else {
            $(this).parent("span").remove()
        }
    })
}
function bindClearAll() {
    $("#smt_clearall").click(function() {
        $(".smt_left a").removeClass("current");
        $(".smt_chosed").empty();
        $("#randrecipe_result").empty();
        $("#smt_guide").show()
    })
}
