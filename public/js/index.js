$(function() {
    var api = '',
        siteUrl = '',
        api_key = '',
        resource_id = '';

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
                    var fields = "[";
                    $('#para_datastore_create .row').each(function() {
                        fields += "{'id': '" + $(this).find('input').val();
                        fields += "', 'type':'" + $(this).find('select').val() + "'},";
                    });
                    fields += "]";
                    alert('fields');
                    // var data = {
                    //     resource_id: "08d4e29a-3524-46ed-8261-a57f6ca1ff07",
                    //     force: true,
                    //     fields: "",
                    //     Authorization: "74de0aaf-5cf6-437a-bc33-f35fd6a8bd39"
                    // };
                    // $.ajax({
                    //     url: 'http://data.sjtu.edu.cn/api/3/action/datastore_create',
                    //     data: data,
                    //     dataType: 'jsonp',
                    //     success: function(data) {
                    //         alert(data.success);
                    //     }
                    // });
                }
                break;
            default:
                break;
        }
    });
});