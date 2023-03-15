<?php
$wall_id="-25334606";
$group_id = preg_replace("/-/i", "", $wall_id);
$count = "30";
$token = "d967fbe5d967fbe5d967fbe541da75bb04dd967d967fbe5baa1a9e3b982da084134f66d";
$api = file_get_contents("https://api.vk.com/api.php?oauth=1&method=wall.get&owner_id={$wall_id}&count={$count}&v=5.131&access_token={$token}");
$wall = json_decode($api);
$wall = $wall->response->items;

$arr_height = [];

for ($i=0; $i < count($wall); $i++) {
    // условие, что вложения не картинка
    $attach_no_img = $wall[$i]->attachments[0]->type === "video";
    if(isset($wall[$i]->copy_history) || $attach_no_img) {
        continue;
    } else {
        $text = $wall[$i]->text;
        // регулярки для смайликов
        $smile_pattern = '/([0-9#][\x{20E3}])|[\x{00ae}\x{00a9}\x{203C}\x{2047}\x{2048}\x{2049}\x{3030}\x{303D}\x{2139}\x{2122}\x{3297}\x{3299}][\x{FE00}-\x{FEFF}]?|[\x{2190}-\x{21FF}][\x{FE00}-\x{FEFF}]?|[\x{2300}-\x{23FF}][\x{FE00}-\x{FEFF}]?|[\x{2460}-\x{24FF}][\x{FE00}-\x{FEFF}]?|[\x{25A0}-\x{25FF}][\x{FE00}-\x{FEFF}]?|[\x{2600}-\x{27BF}][\x{FE00}-\x{FEFF}]?|[\x{2900}-\x{297F}][\x{FE00}-\x{FEFF}]?|[\x{2B00}-\x{2BF0}][\x{FE00}-\x{FEFF}]?|[\x{1F000}-\x{1F6FF}][\x{FE00}-\x{FEFF}]?/u';
        $smile_pattern_with_mark = '/[!,.?]\s*(([0-9#][\x{20E3}])|[\x{00ae}\x{00a9}\x{203C}\x{2047}\x{2048}\x{2049}\x{3030}\x{303D}\x{2139}\x{2122}\x{3297}\x{3299}][\x{FE00}-\x{FEFF}]?|[\x{2190}-\x{21FF}][\x{FE00}-\x{FEFF}]?|[\x{2300}-\x{23FF}][\x{FE00}-\x{FEFF}]?|[\x{2460}-\x{24FF}][\x{FE00}-\x{FEFF}]?|[\x{25A0}-\x{25FF}][\x{FE00}-\x{FEFF}]?|[\x{2600}-\x{27BF}][\x{FE00}-\x{FEFF}]?|[\x{2900}-\x{297F}][\x{FE00}-\x{FEFF}]?|[\x{2B00}-\x{2BF0}][\x{FE00}-\x{FEFF}]?|[\x{1F000}-\x{1F6FF}][\x{FE00}-\x{FEFF}]?)/u';
        $smile_pattern_without_mark = '/\w\s*(([0-9#][\x{20E3}])|[\x{00ae}\x{00a9}\x{203C}\x{2047}\x{2048}\x{2049}\x{3030}\x{303D}\x{2139}\x{2122}\x{3297}\x{3299}][\x{FE00}-\x{FEFF}]?|[\x{2190}-\x{21FF}][\x{FE00}-\x{FEFF}]?|[\x{2300}-\x{23FF}][\x{FE00}-\x{FEFF}]?|[\x{2460}-\x{24FF}][\x{FE00}-\x{FEFF}]?|[\x{25A0}-\x{25FF}][\x{FE00}-\x{FEFF}]?|[\x{2600}-\x{27BF}][\x{FE00}-\x{FEFF}]?|[\x{2900}-\x{297F}][\x{FE00}-\x{FEFF}]?|[\x{2B00}-\x{2BF0}][\x{FE00}-\x{FEFF}]?|[\x{1F000}-\x{1F6FF}][\x{FE00}-\x{FEFF}]?)/u';
        
        // перенос хеш-тегов в отдельный массив
        $hash_tags = array();
        $text = preg_replace_callback('/#\w+/u', function ($mathes) {
            global $hash_tags;
            array_push($hash_tags, $mathes[0]);
            return '';
        }, $text);

        if(isset($wall[$i]->attachments)) {
            $img = $wall[$i]->attachments[0]->photo->sizes[2]->url;
            $img_height = $wall[$i]->attachments[0]->photo->sizes[2]->height;
        }
        // заполнение массива размера картинок
        if(isset($img_height)) {
            array_push($arr_height, $img_height);
        } else {
            array_push($arr_height, 0);
        }

    $text = preg_replace_callback('|\[id\d+\|.*\w+\s*\w*.*\]|u', function ($mathes) {
        $mathes[0] = preg_replace('|\[id\d+\||', "", $mathes[0]);
        $mathes[0] = preg_replace('|\]|', "", $mathes[0]);
        return $mathes[0];
    }, $text);

    $text = preg_replace('/\n/u', "<br>", $text);
    $text = preg_replace('/[[:^print:]]/u', "", $text);
    $text = preg_replace_callback($smile_pattern_with_mark, function($mathes) {
        global $smile_pattern;
        $mathes[0] = preg_replace($smile_pattern, "", $mathes[0]);
        return $mathes[0];
    }, $text);
    $text = preg_replace_callback($smile_pattern_without_mark, function($mathes) {
        global $smile_pattern;
        $mathes[0] = preg_replace($smile_pattern, ".", $mathes[0]);
        return $mathes[0];
    }, $text);
    $text = preg_replace_callback($smile_pattern, function($mathes) {
        global $smile_pattern;
        $mathes[0] = preg_replace($smile_pattern, "", $mathes[0]);
        return $mathes[0];
    }, $text);

    $hash_tags_str = join($hash_tags, " ");
    $date = date("Y-m-d", $wall[$i]->date);

    echo <<<EOT
    <div class="incorrect-table__item">
    <h4>$date</h4>
    <img src="$img">
    <p>{$text}</p>
    <p>{$hash_tags_str}</p>
    </div>
EOT;
    }    
}
?>
<div class="data-php" data-attr="<?=json_encode($arr_height)?>"></div>