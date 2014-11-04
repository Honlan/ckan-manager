$(function() {
    var api = '',
        siteUrl = '',
        api_key = '',
        rid = '',
        resource_dict = '';

    $("[data-toggle='tooltip']").tooltip();

    $("#api").change(function() {
        $(api).slideUp(300);
        api = $(this).val();
        setTimeout(function() {
            $(api).slideDown('slow')
        }, 400);
    });

    $('#para_datastore_create h5').click(function() {
        $(this).parent().children('div.row:first').clone().appendTo($(this).parent());
    });

    $('#run').click(function() {
        switch (api) {
            case '#para_datastore_create':
                siteUrl = $('#info input').val();
                api_key = $('#api_key').val();
                rid = $('#rid').val();
                if (!siteUrl) {
                    alert('Ckan Site Not Provided!');
                } else if (!rid) {
                    alert('Resource Id Not Provided!');
                } else if (!api_key) {
                    alert('Api Key Not Provided!');
                } else {
                    var empty = false;
                    $('#para_datastore_create .row').each(function() {
                        if ($(this).find('input').val() == '' || $(this).find('select').val() == '') {
                            empty = true;
                            return false;
                        }
                    });
                    if (empty) {
                        alert('Fields Not Complete!')
                    } else {
                        var fields = '[';
                        $('#para_datastore_create .row').each(function() {
                            fields += '{"id": "' + $(this).find('input').val();
                            fields += '", "type":"' + $(this).find('select').val() + '"},';
                        });
                        fields = fields.substring(0, fields.length - 1);
                        fields += ']';
                        resource_dict = '{"fields": ' + fields + ', "force": true, "resource_id": "' + rid + '"}';
                        $.ajax({
                            url: 'ckan.php',
                            type: 'POST',
                            data: {
                                siteUrl: siteUrl,
                                api_key: api_key,
                                resource_dict: resource_dict,
                                api: 'datastore_create'
                            },
                            dataType: 'json',
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                alert('数据仓库新建失败！');
                                //alert(XMLHttpRequest.status + ' ' + XMLHttpRequest.readyState + ' ' + textStatus);
                            },
                            success: function(data) {
                                alert('数据仓库新建成功！');
                            }
                        });
                    }
                }
                break;
            case '#para_url_update':
                alert('此功能暂不完善，慎用！');
                // siteUrl = $('#info input').val();
                // api_key = $('#api_key').val();
                // rid = $('#rid').val();
                // if (!siteUrl) {
                //     alert('Ckan Site Not Provided!');
                // } else if (!rid) {
                //     alert('Resource Id Not Provided!');
                // } else if (!api_key) {
                //     alert('Api Key Not Provided!');
                // } else {
                //     resource_dict = '{"id": "' + rid + '", "revision_id": "1.1", "url": "http://' + siteUrl + '/datastore/dump/' + rid + '"}';
                //     $.ajax({
                //         url: 'ckan.php',
                //         type: 'POST',
                //         data: {
                //             siteUrl: siteUrl,
                //             api_key: api_key,
                //             resource_dict: resource_dict,
                //             api: 'resource_update'
                //         },
                //         dataType: 'json',
                //         error: function(XMLHttpRequest, textStatus, errorThrown) {
                //             alert('资源url更新失败！');
                //             //alert(XMLHttpRequest.status + ' ' + XMLHttpRequest.readyState + ' ' + textStatus);
                //         },
                //         success: function(data) {
                //             alert('资源url更新成功！');
                //         }
                //     });
                // }
                break;
            case '#para_datastore_delete':
                siteUrl = $('#info input').val();
                api_key = $('#api_key').val();
                rid = $('#rid').val();
                if (!siteUrl) {
                    alert('Ckan Site Not Provided!');
                } else if (!rid) {
                    alert('Resource Id Not Provided!');
                } else if (!api_key) {
                    alert('Api Key Not Provided!');
                } else {
                    resource_dict = '{"resource_id": "' + rid + '", "force": true, "filters": ' + $('#filters').val() + '}';
                    $.ajax({
                        url: 'ckan.php',
                        type: 'POST',
                        data: {
                            siteUrl: siteUrl,
                            api_key: api_key,
                            resource_dict: resource_dict,
                            api: 'datastore_delete'
                        },
                        dataType: 'json',
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('数据仓库删除失败！');
                            //alert(XMLHttpRequest.status + ' ' + XMLHttpRequest.readyState + ' ' + textStatus);
                        },
                        success: function(data) {
                            alert('数据仓库删除成功！');
                        }
                    });
                }
                break;
            default:
                break;
        }
    });
});