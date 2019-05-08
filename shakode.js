shakode={}

window.onload = function(){
    shakode.storage = window.localstorage
    window.addEventListener("storage", function(e){
        if (e.storageArea===shakode.storage) {
            if (e.key!==null) {
                if (e.newValue!==null) {
                    if (e.oldValue!==null) {
                        shakode.onUpdatedStorage(e.key, e.oldValue, e.newValue);
                    } else {
                        shakode.onAddedStorage(e.key, e.newValue);
                    }
                } else {
                    shakode.onRemovedStorage(e.key, e.oldValue);
                }
            } else {
                shakode.onClearedStorage();
            }
        }
    });

    shakode.target_info = document.getElementById("target_info");
    shakode.load_input = document.getElementById("load_input");
    shakode.loaded_target_selection = document.getElementById("loaded_target_selection");
    shakode.loaded_target_placeholder = document.getElementById("loaded_target_placeholder");
    shakode.loaded_tree = document.getElementById("loaded_tree");
    shakode.concentration_button = document.getElementById("concentration_button");
    shakode.flip_button = document.getElementById("flip_button");
    shakode.current_page = document.getElementById("current_page");
    shakode.save_button = document.getElementById("save_button");
    shakode.save_as_button = document.getElementById("save_as_button");
    shakode.current_file = document.getElementById("current_file");
    shakode.learning_code = document.getElementById("learning_code");
    shakode.teacher_code = document.getElementById("teacher_code");

    if (shakode.is_support_input_directory()) {
        shakode.init_for_directory_mode();
    } else {
        shakode.init_for_file_mode();
    }

    if (shakode.is_exists_storage_data()) {
        shakode.restore_from_storage();
        shakode.focus_code();
    } else {
        shakode.blur_code();
    }

    //TODO. Test
    shakode.resize_codes();
};

shakode.onUpdatedStorage = function(key, oldValue, newValue)
{
}

shakode.onAddedStorage = function(key, newValue)
{
}

shakode.onRemovedStorage = function(key, oldValue)
{
}

shakode.onClearedStorage = function()
{
}

shakode.is_support_input_directory = function()
{
    return false;/*TODO. test for file mode.*/

    var input = document.createElement("input");
    if(typeof input.webkitdirectory !== "boolean" &&
       typeof input.directory !== "boolean")
    {
        return false;
    }
    return true;
}

shakode.init_for_directory_mode = function()
{
    shakode.target_alias_text = document.getElementById("target_alias_text");
    shakode.select_target_button = document.getElementById("select_target_button");
    shakode.load_target_button = document.getElementById("load_target_button");

    /*　・サポートしていれば、教師コードへ切り替えボタン無効化*/
}

shakode.init_for_file_mode = function()
{
    /*　・サポートしていなければ、#load_inputを無効化*/
}

shakode.is_exists_storage_data = function()
{
    
}

shakode.onInputedTarget = function()
{
    /*エイリアスが前回選択時間より古かったら、ディレクトリ名に変更*/

    /*選択時間更新*/
}

shakode.onBlurAlias = function()
{
    /*エイリアス変更時間更新*/
}

shakode.onLoadTarget = function()
{
    /*ターゲットを保存*/
    change_target();
}

shakode.onChangedTarget = function()
{
    /*入力が正しいか？*/
    change_target();
}

shakode.change_target = function()
{
    /*ツリー構築*/
}

shakode.onToggleFocusCode = function()
{
    /*
    モード？
    　・設定モードなら、focus_code();
    　・集中モードなら、blur_code();
      */
}

shakode.focus_code = function()
{
    /*
#target_info 非表示
#concentration_button.value="...";
    先頭へ移動
      */
}

shakode.blur_code = function()
{
    /*
#target_info 表示
#concentration_button.value="Focus on the code!";
    先頭へ移動
      */
}

shakode.onToggleFlipCode = function()
{
    /*
    どのページ？
    　・勉強ページなら、flip_to_teacher_code();
    　・教師ページなら、flip_to_learning_code();
      */
}

shakode.flip_to_tearcher_code = function()
{
    /*
#learning_code 非表示
#flip_button.value = "Flip to learning code.";
#current_page.innerText = "Tearcher";
      */
}

shakode.flip_to_learning_code = function()
{
    /*
#learning_code 表示
#flip_button.value = "Flip to tearcher code.";
#current_page.innerText = "Learning";
      */
}

shakode.onSaveCode = function()
{
    /*
    どのページ？
    　・勉強ページなら、save_learning_code();
    　・教師ページなら、save_tearcher_code();
      */
}

shakode.save_learning_code = function()
{
    /*
    勉強ページ保存
      */
}

shakode.save_tearcher_code = function()
{
    //教師ページ保存
}

shakode.resize_codes = function()
{
    var width = document.body.clientWidth;
    //shakode.learning_code.style.right = width;
    //shakode.teacher_code.style.right = width;
    
}
