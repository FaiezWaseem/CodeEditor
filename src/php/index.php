<?php
// use absolute path of directory i.e: '/var/www/folder' or $_SERVER['DOCUMENT_ROOT'].'/folder'
$root_path = $_SERVER['DOCUMENT_ROOT'];
// $root_path ="E:";


// Download file
    if(isset($_GET["dw"])){
          $file = $_GET["dw"];
  
        if (file_exists($file)) {
            if(is_dir($file)){
                exit ;
            }
          header('Content-Description: File Transfer');
          header('Content-Type: application/octet-stream');
          header('Content-Disposition: attachment; filename='.basename($file));
          header('Content-Transfer-Encoding: binary');
          header('Expires: 0');
          header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
          header('Pragma: public');
          header('Content-Length: ' . filesize($file));
          ob_clean();
          flush();
          readfile($file);
      exit;
      }
    }else{
        header("Access-Control-Allow-Origin: *");
        header("Content-Type:application/json");
    }
    if(isset($_POST["getRoot"])){
     return response(200,"Ok",$root_path);
    }
    if(isset($_POST["getFolder"]) && isset($_POST["path"])){
        $current_path = $_POST["path"];
        $dir_files = array();
        if (is_dir($_POST["path"])){
            if ($dh = opendir($_POST["path"])){
             while (($file = readdir($dh)) !== false){
                 if($file !== ".." && $file !== "."){
                        $ext = pathinfo($file, PATHINFO_EXTENSION);
                        array_push($dir_files, ["name"=>$file,"ext"=>$ext , "is_dir" => is_dir($current_path."/".$file)]);
                   }
               }
            } 
            return response(200,"Ok", $dir_files);
        }else{
            return response(300,"Not A folder", $_POST["path"]);
        }
    }
    if(isset($_POST["create"]) && isset($_POST["folder"]) && isset($_POST["path"])){
        if(mkdir($_POST["path"]."/".$_POST["folder"])){
            return response(200,"Ok",$_POST["folder"]." Created");
        }else{
            return response(300,"Ok", $_POST["folder"] . " Failed to create!");
        }
    }
    if(isset($_POST["create"]) && isset($_POST["path"]) && isset($_POST["data"])){
        saveFile($_POST["path"],json_decode($_POST["data"]));
        response(200,"Ok",getFile($_POST["path"]));
    }
    if(isset($_POST["get"]) && isset($_POST["path"])){
        response(200,"Ok",getFile($_POST["path"]));
    }
    if(isset($_POST["save"]) && isset($_POST["path"]) && isset($_POST["data"])){
        saveFile($_POST["path"],$_POST["data"]);
        response(200,"Ok",getFile($_POST["path"]));
    }
    if(isset($_POST["remove"]) && isset($_POST["path"])){
        if(deleteDirectory($_POST["path"])){
            response(200,"Ok","Delete failed");
        }else{
            response(300,"Ok","Delete failed");
        }
    }



function deleteDirectory($dir) {
        if (!file_exists($dir)) {
            return true;
        }
    
        if (!is_dir($dir)) {
            return unlink($dir);
        }
    
        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
    
            if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }
    
        }
    
        return rmdir($dir);
}
function saveFile(String $path, $content){
    $myfile = fopen($path, "w") or die("Unable to open file!");  
    $text = json_decode($content);
      fwrite($myfile, $text); 
      fclose($myfile);
  }

function getFile(String $path){
   if(file_exists($path)){
    return file_get_contents($path);
   }else{
   return null;
   }

 }
function response($status,$status_message,$data){
	header("HTTP/1.1 ".$status);
	$response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;
	$json_response = json_encode($response);
	echo $json_response;
}

?>