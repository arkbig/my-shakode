function init()
{
ローカルストレージ作成

input directoryをサポートしているか？
　・サポートしていれば、教師コードへ切り替えボタン無効化
　・サポートしていなければ、#load_inputを無効化

前回データあるか？
　・あれば、復元、集中モード
　・なければ、設定モード

テキストエリアのサイズ監視、同期
}

function is_support_input_directory()
{
 var input = document.createElement("input");
 if(typeof input.webkitdirectory !== "boolean" &&
    typeof input.directory !== "boolean")
 {
  return false;
 }
 return true;
}

function onInputedTarget()
{
    エイリアスが前回選択時間より古かったら、ディレクトリ名に変更

    選択時間更新
}

function onBlurAlias()
{
    エイリアス変更時間更新
}

function onLoadTarget()
{
    ターゲットを保存
    change_target();
}

function onChangedTarget()
{
    入力が正しいか？
    change_target();
}

function change_target()
{
    ツリー構築
}

function onToggleFocusCode()
{
    モード？
    　・設定モードなら、focus_code();
    　・集中モードなら、blur_code();
}

function focus_code()
{
#target_info 非表示
#concentration_button.value="...";
先頭へ移動
}

function blur_code()
{
#target_info 表示
#concentration_button.value="Focus on the code!";
先頭へ移動
}

function onToggleFlipCode()
{
    どのページ？
    　・勉強ページなら、flip_to_teacher_code();
    　・教師ページなら、flip_to_learning_code();
}

function flip_to_tearcher_code()
{
    #learning_code 非表示
    #flip_button.value = "Flip to learning code.";
    #current_page.innerText = "Tearcher";
}

function flip_to_learning_code()
{
    #learning_code 表示
    #flip_button.value = "Flip to tearcher code.";
    #current_page.innerText = "Learning";
}

function onSaveCode()
{
    どのページ？
    　・勉強ページなら、save_learning_code();
    　・教師ページなら、save_tearcher_code();
}

function save_learning_code()
{
    勉強ページ保存
}

function save_tearcher_code()
{
    教師ページ保存
}

function onKeyupCodeArea()
{
    どのページ？
    　・勉強ページなら、resize_code_area(#learning_code, #tearcher_code);
    　・教師ページなら、resize_code_area(#tearcher_code, #learning_code);
}

function resize_code_area(
primary_area
   ,slave_area
   )
{
    primary_areaをスクロールサイズに変更

    sync_code_area(primary_area, slave_area);
}

function onChangeSizeCodeArea()
{
    どのページ？
    　・勉強ページなら、sync_code_area(#learning_code, #tearcher_code);
    　・教師ページなら、sync_code_area(#tearcher_code, #learning_code);
}

function sync_code_area(
privary_area
   ,slave_area
   )
{
    primary_areaの位置、サイズ取得
    slave_areaの位置、サイズ変更
}

