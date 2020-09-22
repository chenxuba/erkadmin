<?php
/**
 * 抓取远程图片
 * User: Jinqn
 * Date: 14-04-14
 * Time: 下午19:18
 */
set_time_limit(0);
include("Uploader.class.php");
include "qiniu/php-sdk/autoload.php";
use Qiniu\Auth;
use Qiniu\Storage\UploadManager;

//用于签名的公钥和密钥
$accessKey = 'OrL5f2-qfhJ1zmiMoPuePKFuHhxowE4VkdJn28vx';
$secretKey = 'A__fv3mNu2v9-cT0M1Z6PuekZDZOMLszwdc3ax6K';

  // 初始化签权对象
$auth = new Auth($accessKey, $secretKey);

$bucket = 'erkang-zhushou';

 //覆盖上传
$expires = 3600;
//自定义返回值
$returnBody = '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"name":"$(x:name)","ext":${ext}}';
$policy = array(
    'returnBody' => $returnBody
);

/* 上传配置 */
$config = array(
    "pathFormat" => $CONFIG['catcherPathFormat'],
    "maxSize" => $CONFIG['catcherMaxSize'],
    "allowFiles" => $CONFIG['catcherAllowFiles'],
    "oriName" => "remote.png"
);
$fieldName = $CONFIG['catcherFieldName'];

/* 抓取远程图片 */
$list = array();
if (isset($_POST[$fieldName])) {
    $source = $_POST[$fieldName];
} else {
    $source = $_GET[$fieldName];
}

foreach ($source as $imgUrl) {
	//七牛云上传
$uploadToken=$auth->uploadToken($bucket);
//初始化图片上传类
$bucketManager = new \Qiniu\Storage\BucketManager($auth);
$ext = getimgsuffix($imgUrl);
//上传后的文件名
$key = md5(time()) . '.' . $ext;

list($ret, $err) = $bucketManager->fetch($imgUrl, $bucket, $key);
if ($err !== null) {
  var_dump($err);
} else {
  	$response=[
	 "state" => "SUCCESS",          //上传状态，上传成功时必须返回"SUCCESS"
	 "url" => 'http://erkong.ybc365.com/'.$ret['key'],            //返回的地址
     "title" => $ret['key'],          //新文件名
     "original" => $imgUrl,       //原始文件名
     "type" => $ret['mimeType'],           //文件类型
     "size" => $ret['fsize'],  
	 "source" => htmlspecialchars($imgUrl)	 //文件大小
];
 array_push($list,$response);
    //$item = new Uploader($imgUrl, $config, "remote");
   // $info = $item->getFileInfo();
}}


/* 返回抓取数据 */
return json_encode(array(
    'state'=> count($list) ? 'SUCCESS':'ERROR',
    'list'=> $list
));

function getimgsuffix($name) {
  $info = getimagesize($name);
  $suffix = false;
  if ($mime = $info['mime']) {
      $suffix = explode('/', $mime)[1];
  }
  return $suffix;
}