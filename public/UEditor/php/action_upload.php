<?php
/**
 * 上传附件和上传视频
 * User: Jinqn
 * Date: 14-04-09
 * Time: 上午10:17
 */
include "Uploader.class.php";
include "qiniu/php-sdk/autoload.php";
use Qiniu\Auth;
use Qiniu\Storage\UploadManager;

//用于签名的公钥和密钥
$accessKey = 'OrL5f2-qfhJ1zmiMoPuePKFuHhxowE4VkdJn28vx';
$secretKey = 'A__fv3mNu2v9-cT0M1Z6PuekZDZOMLszwdc3ax6K';

  // 初始化签权对象
$auth = new Auth($accessKey, $secretKey);

$bucket = 'erkang-zhushou';

/* 上传配置 */
$base64 = "upload";
switch (htmlspecialchars($_GET['action'])) {
    case 'uploadimage':
        $config = array(
            "pathFormat" => $CONFIG['imagePathFormat'],
            "maxSize" => $CONFIG['imageMaxSize'],
            "allowFiles" => $CONFIG['imageAllowFiles']
        );
        $fieldName = $CONFIG['imageFieldName'];
        break;
    case 'uploadscrawl':
        $config = array(
            "pathFormat" => $CONFIG['scrawlPathFormat'],
            "maxSize" => $CONFIG['scrawlMaxSize'],
            "allowFiles" => $CONFIG['scrawlAllowFiles'],
            "oriName" => "scrawl.png"
        );
        $fieldName = $CONFIG['scrawlFieldName'];
        $base64 = "base64";
        break;
    case 'uploadvideo':
        $config = array(
            "pathFormat" => $CONFIG['videoPathFormat'],
            "maxSize" => $CONFIG['videoMaxSize'],
            "allowFiles" => $CONFIG['videoAllowFiles']
        );
        $fieldName = $CONFIG['videoFieldName'];
        break;
    case 'uploadfile':
    default:
        $config = array(
            "pathFormat" => $CONFIG['filePathFormat'],
            "maxSize" => $CONFIG['fileMaxSize'],
            "allowFiles" => $CONFIG['fileAllowFiles']
        );
        $fieldName = $CONFIG['fileFieldName'];
        break;
}
$policy = array(
  'callbackBody' => 'key=$(key)&hash=$(etag)&bucket=$(bucket)&fsize=$(fsize)&name=$(x:name)',
  'callbackBodyType' => 'application/json'
);
$token = $auth->uploadToken($bucket, null, $expires, $policy, true);

// 构建 UploadManager 对象
$uploadMgr = new UploadManager();
// 要上传文件的本地路径
$filePath = $_FILES['upfile']['tmp_name'];

$file_type = $_FILES["upfile"]["type"];

$type = '';

switch ($file_type) {
  case 'image/png':
    $type = '.png';
    break;
  case 'image/gif':
    $type = '.gif';
    break;
  case 'image/jpeg':
    $type = '.jpg';
    break;
}
$savename = date('YmdHis',time()).mt_rand(0,9999);
// 上传到七牛后保存的文件名
$name = $savename.$type;


list($ret, $err) = $uploadMgr->putFile($token, $name, $filePath);
if ($err !== null) {
  $data["code"] = 500;
  $data["msg"] = '上传失败';
  $data["errno"] = $_FILES["file"]["error"];
  echo json_encode($data);
} else {
  	$response=[
	 "state" => "SUCCESS",          //上传状态，上传成功时必须返回"SUCCESS"
	 "url" => 'http://erkong.ybc365.com/'.$ret['key'],            //返回的地址 //改这里
     "title" => $ret['key'],          //新文件名
     "original" => $filePath,       //原始文件名
     "type" => $ret['mimeType'],           //文件类型
     "size" => $ret['fsize'],  
	 "source" => htmlspecialchars($filePath)	 //文件大小
    ];
  }
/* 生成上传实例对象并完成上传 */
//$up = new Uploader($fieldName, $config, $base64);

/**
 * 得到上传文件所对应的各个参数,数组结构
 * array(
 *     "state" => "",          //上传状态，上传成功时必须返回"SUCCESS"
 *     "url" => "",            //返回的地址
 *     "title" => "",          //新文件名
 *     "original" => "",       //原始文件名
 *     "type" => ""            //文件类型
 *     "size" => "",           //文件大小
 * )
 */

/* 返回数据 */
return json_encode($response);


