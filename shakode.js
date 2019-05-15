class shakode_t
{
    constructor ()
    {
        this.init_storage();

        this.init_elements();

        if (this.is_support_input_directory()) {
            this.init_for_directory_mode();
        } else {
            this.init_for_file_mode();
        }

        if (this.is_exists_storage_data()) {
            this.restore_from_storage();
            this.focus_code();
        } else {
            this.blur_code();
        }

        this.init_events();
    }

    init_storage()
    {
        /*
         # storage rule
         projects: ｛ projects: [%｛proj_name｝,...] ｝
         current: ｛ project: %｛proj_name｝, file: %｛file_path｝ ｝
         files_%｛proj_name｝: ｛ files: [%｛file_path｝,...] ｝
         teacher_%｛proj_name｝_%｛file_path｝: ｛ last_update_date: %｛update_date｝, blob: %｛raw_data｝ ｝
         learning_%｛proj_name｝_%｛file_path｝: ｛ last_update_date: %｛update_date｝, blob: %｛raw_data｝ ｝
         tmp_%｛proj_name｝_%｛file_path｝: ｛ last_update_date: %｛update_date｝, blob: %｛row_data｝ ｝
         */
        this.storage = window.localstorage
        window.addEventListener("storage", (e)=>{
            if (e.storageArea===this.storage) {
                if (e.key!==null) {
                    if (e.newValue!==null) {
                        if (e.oldValue!==null) {
                            this.onUpdatedStorage(e.key, e.oldValue, e.newValue);
                        } else {
                            this.onAddedStorage(e.key, e.newValue);
                        }
                    } else {
                        this.onRemovedStorage(e.key, e.oldValue);
                    }
                } else {
                    this.onClearedStorage();
                }
            }
        });
    }

    init_elements()
    {
        this.target_info = document.getElementById("target_info");
        this.load_input = document.getElementById("load_input");
        this.loaded_target_selection = document.getElementById("loaded_target_selection");
        this.loaded_target_placeholder = document.getElementById("loaded_target_placeholder");
        this.loaded_tree = document.getElementById("loaded_tree");
        this.concentration_button = document.getElementById("concentration_button");
        this.flip_button = document.getElementById("flip_button");
        this.current_page = document.getElementById("current_page");
        this.save_button = document.getElementById("save_button");
        this.save_as_button = document.getElementById("save_as_button");
        this.current_file = document.getElementById("current_file");
        this.learning_code = document.getElementById("learning_code");
        this.teacher_code = document.getElementById("teacher_code");

        if (this.is_support_input_directory()) {
            this.target_alias_text = document.getElementById("target_alias_text");
            this.select_target_button = document.getElementById("select_target_button");
            this.load_target_button = document.getElementById("load_target_button");
        }
    }

    init_events()
    {
        this.concentration_button.addEventListener("click", ()=>{
            if (this.is_focus_code()) {
                this.blur_code();
            } else {
                this.focus_code();
            }
        });

        this.flip_button.addEventListener("click", ()=>{
            if (this.is_current_learning()) {
                this.flip_to_teacher_code();
            } else {
                this.flip_to_learning_code();
            }
        });

        this.save_button.addEventListener("click", ()=>{
            if (this.is_current_learning()) {
                this.save_learning_code();
            } else {
                this.save_teacher_code();
            }
        });
        this.save_as_button.addEventListener("click", ()=>{
            if (this.is_current_teacher()) {
                this.save_as_teacher_code();
            }
        });
    }


    onUpdatedStorage(key, oldValue, newValue)
    {
    }

    onAddedStorage(key, newValue)
    {
    }

    onRemovedStorage(key, oldValue)
    {
    }

    onClearedStorage()
    {
    }

    is_support_input_directory()
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

    is_blur_code()
    {
        return this.target_info.style.display != "none";
    }
    is_focus_code()
    {
        return !this.is_blur_code();
    }

    is_current_learning()
    {
        return this.learning_code.style.display != "none";
    }
    is_current_teacher()
    {
        return !this.is_current_learning();
    }

    init_for_directory_mode()
    {

        /*　・サポートしていれば、教師コードへ切り替えボタン無効化*/
    }

    init_for_file_mode()
    {
        /*　・サポートしていなければ、#load_inputを無効化*/
    }

    is_exists_storage_data()
    {

    }

    onInputedTarget()
    {
        /*エイリアスが前回選択時間より古かったら、ディレクトリ名に変更*/

        /*選択時間更新*/
    }

    onBlurAlias()
    {
        /*エイリアス変更時間更新*/
    }

    onLoadTarget()
    {
        /*ターゲットを保存*/
        change_target();
    }

    onChangedTarget()
    {
        /*入力が正しいか？*/
        change_target();
    }

    change_target()
    {
        /*ツリー構築*/
    }

    focus_code()
    {
        this.target_info.style.display = "none";
        this.concentration_button.value="...";
    }

    blur_code()
    {
        this.target_info.style.display = "block";
        this.concentration_button.value="Focus on the code!";
        window.scrollTo(0,0);
    }

    flip_to_teacher_code()
    {
        this.learning_code.style.display = "none";
        this.teacher_code.disabled = false;
        this.save_as_button.style.visibility = "visible";
        this.flip_button.value = "Flip to learning code.";
        this.current_page.innerHTML = "Teacher<rt>current_is</rt>";
    }

    flip_to_learning_code()
    {
        this.learning_code.style.display = "block";
        this.teacher_code.disabled = true;
        this.save_as_button.style.visibility = "hidden";
        this.flip_button.value = "Flip to teacher code.";
        this.current_page.innerHTML = "Learning<rt>current_is</rt>";
    }

    save_learning_code()
    {
        /*
         勉強ページ保存
         */
    }

    save_tearcher_code()
    {
        //教師ページ保存
    }
}


function ready(callback){
    if (document.readyState!='loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', ()=>{
        if (document.readyState=='complete') callback();
    });
}
ready(()=>{
    new shakode_t();
});

