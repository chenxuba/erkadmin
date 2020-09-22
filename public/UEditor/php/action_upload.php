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
 //覆盖上传
$expires = 3600;
//自定义返回值
$returnBody = '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"name":"$(x:name)","ext":${ext}}';
$policy = array(
    'returnBody' => $returnBody
);
//七牛云上传
$uploadToken=$auth->uploadToken($bucket,$fieldName,$expires,$policy,true);
$tokenData=json_decode($uploadToken,true);
$response=[
	 "state" => "SUCCESS",          //上传状态，上传成功时必须返回"SUCCESS"
	 "url" => $uploadToken['key'],            //返回的地址
     "title" => $uploadToken['name'],          //新文件名
     "original" => $uploadToken['key'],       //原始文件名
     "type" => $uploadToken['ext'],            //文件类型
     "size" => $uploadToken['fsize'],           //文件大小
];
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
