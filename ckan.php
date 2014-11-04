<?php
	$siteUrl = $_POST['siteUrl'];
	$api_key = $_POST['api_key'];
	$resource_dict = $_POST['resource_dict'];
	$api = $_POST['api'];

    $remote_server = 'http://'.$siteUrl.'/api/3/action/'.$api;
    $context = array(
        'http'=>array(
            'method'=>'POST',
            'header'=>'Authorization: '.$api_key,
            'content'=>$resource_dict )
    );
	// $post_str = '{"fields": [{"id": "name", "type":"text"}], "force": true, "resource_id": "08d4e29a-3524-46ed-8261-a57f6ca1ff07"}';
 // 	$remote_server = 'http://data.sjtu.edu.cn/api/3/action/datastore_create';
 //    $context = array(
 //        'http'=>array(
 //            'method'=>'POST',
 //            'header'=>'Authorization: 74de0aaf-5cf6-437a-bc33-f35fd6a8bd39',
 //            'content'=>$post_str )
 //    );
    $stream_context = stream_context_create( $context );
    $data = file_get_contents( $remote_server, FALSE, $stream_context );
    echo json_encode(array(
			'result' => $data
		));
?>