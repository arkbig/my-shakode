/* TODO:
・ストレージ保存
・記号キー登録
・ハイライト
・diff
*/

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

        this.flip_to_learning_code();
        this.close_burger_menu();
        this.close_save_dialog();

        this.init_events();
    }

    init_storage()
    {
        /*
         # storage rule
         projects: ｛ projects: [%｛proj_name｝,...] ｝
         current: ｛ project: %｛proj_name｝, path: %｛file_path｝ ｝
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
        this.code_menu = document.getElementById("code_menu");
        this.concentration_button = document.getElementById("concentration_button");
        this.flip_button = document.getElementById("flip_button");
        this.current_page = document.getElementById("current_page");
        this.save_button = document.getElementById("save_button");
        this.save_as_button = document.getElementById("save_as_button");
        this.current_file = document.getElementById("current_file");
        this.learning_code = document.getElementById("learning_code");
        this.teacher_code = document.getElementById("teacher_code");
        this.burger_menu = document.getElementById("burger_menu");
        this.burger_opt = document.getElementById("burger_opt");
        this.shakyo_button = document.getElementById("shakyo_button");
        this.burger_button = document.getElementById("burger_button");
        this.save_dialog = document.getElementById("save_dialog");
        this.save_alias_text = document.getElementById("save_alias_text");
        this.save_name_text = document.getElementById("save_name_text");
        this.save_target_button = document.getElementById("save_target_button");
        this.save_cancel_button = document.getElementById("save_cancel_button");
        this.save_form_error = document.getElementById("save_form_error");

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
                if (this.is_closed_save_dialog()) {
                    this.open_save_dialog();
                }
            }
        });

        this.burger_button.addEventListener("click", ()=>{
            if (this.is_opening_burger_menu()) {
                this.close_burger_menu();
            } else {
                this.open_burger_menu();
            }
        });

        this.shakyo_button.addEventListener("click", ()=>{
            if (this.is_shakyo_mode()) {
                this.exit_shakyo_mode();
            } else {
                this.enter_shakyo_mode();
            }
        });

        window.onpopstate = (e) => {
            if (this.self_open_save_dialog) {
                this.self_open_save_dialog = false;
                this.close_save_dialog();
            }
        };

        this.save_cancel_button.addEventListener("click", ()=>{
            this.close_save_dialog();
        });

        this.save_target_button.addEventListener("click", ()=>{
            this.save_as_teacher_code();
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

        const input = document.createElement("input");
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
        this.teacher_code.style.zIndex = 1;
        this.save_as_button.style.visibility = "visible";
        this.flip_button.value = "Flip to learning code.";
        this.current_page.innerHTML = "Teacher<rt>current_is</rt>";
    }

    flip_to_learning_code()
    {
        this.learning_code.style.display = "block";
        this.teacher_code.disabled = true;
        this.teacher_code.style.zIndex = -1;
        this.save_as_button.style.visibility = "hidden";
        this.flip_button.value = "Flip to teacher code.";
        this.current_page.innerHTML = "Learning<rt>current_is</rt>";
    }

    save_learning_code()
    {
        this.storage.setItem("learnings_"+this.current.project+this.current.path, this.teacher_code.value);
    }

    save_teacher_code()
    {
        this.storage.setItem("teachers_"+this.current.project+this.current.path, this.teacher_code.value);
    }

    is_shakyo_mode()
    {
        return this.code_menu.firstChild == null;
    }

    enter_shakyo_mode()
    {
        let fragment = document.createDocumentFragment();
        while (this.code_menu.firstChild) {
            fragment.appendChild(this.code_menu.firstChild);
        }
        this.burger_opt.appendChild(fragment);
        this.focus_code();
        this.close_burger_menu();
        this.shakyo_button.innerText = "Ret";
    }

    exit_shakyo_mode()
    {
        let fragment = document.createDocumentFragment();
        while (this.burger_opt.firstChild) {
            fragment.appendChild(this.burger_opt.firstChild);
        }
        this.code_menu.appendChild(fragment);
        this.blur_code();
        this.close_burger_menu();
        this.shakyo_button.innerText = "写経";
    }

    is_opening_burger_menu()
    {
        return this.burger_opt.style.display != "none";
    }

    open_burger_menu()
    {
        this.burger_opt.style.display = "inline-block";
        this.shakyo_button.style.display = "inline-block";
    }

    close_burger_menu()
    {
        this.burger_opt.style.display = "none";
        this.shakyo_button.style.display = "none";
    }

    is_closed_save_dialog()
    {
        return this.save_dialog.style.display == "none";
    }

    open_save_dialog()
    {
        this.save_dialog.style.display = "block";
        history.pushState(null, null,location.pathname);
        this.self_open_save_dialog = true;

        this.save_alias_text.classList.remove("input_error");
        this.save_name_text.classList.remove("input_error");
        this.save_form_error.innerHTML = "";

        this.save_alias_text.focus();
    }

    close_save_dialog()
    {
        this.save_dialog.style.display = "none";
        if (this.self_open_save_dialog) {
            this.self_open_save_dialog = false;
            history.back();
        }
    }

    save_as_teacher_code()
    {
        let alias_value = this.save_alias_text.value;
        let name_value = this.save_name_text.value;
        let form_error = this.save_form_error;
        form_error.innerHTML = "";
        if (alias_value && name_value) {
            let err=false;
            if (this.contains_invalid_dir_name_chars(alias_value)) {
                this.save_alias_text.classList.add("input_error");
                form_error.innerHTML += `<span class="wrap_group">Can not enter ${this.get_invalid_dir_name_chars().join(",")} in the target.</span>`;
                err=true;
            }
            
            if (this.contains_invalid_file_name_chars(name_value))
            {
                this.save_name_text.classList.add("input_error");
                form_error.innerHTML += `<span class="wrap_group">Can not enter ${this.get_invalid_file_name_chars().join(",")} in the file.</span>`;
                err=true;
            }

            if (!err) {
                let { proj_name, sub_dir } = this.expand_proj_name_and_sub_dir(alias_value);
                if (proj_name) {
                    if (! this.projects.includes(proj_name)) {
                        this.projects.push(proj_name);
                    }
                    this.current.project = proj_name;
                    this.save_projects(proj_name);

                    const file_path = sub_dir + "/" + name_value;
                    if (! this.files.includes(file_path)) {
                        this.files.push(file_path);
                    }
                    this.current.path = file_path;
                    this.save_files();

                    this.save_current();

                    this.save_teacher_code();

                    this.close_save_dialog();
                } else {
                    this.save_alias_text.classList.add("input_error");
                    form_error.innerHTML += '<span class="wrap_group">Enter the project name [can include /subdirs] in the target.</span> ';
                }
            }
        } else {
            if (alias_value) {
                this.save_alias_text.classList.remove("input_error");
            } else {
                this.save_alias_text.classList.add("input_error");
                form_error.innerHTML += '<span class="wrap_group">Enter the project name [can include /subdirs] in the target.</span> ';
            }
            if (name_value) {
                this.save_name_text.classList.remove("input_error");
            } else {
                this.save_name_text.classList.add("input_error");
                form_error.innerHTML += '<span class="wrap_group">Enter the name (with an extension) for the file.</span> ';
            }
        }
    }

    get_invalid_file_name_chars()
    {
        return ['"','*','/',':','<','>','?','\\','|']; /*and ascii code 0x00-0x31*/
    }

    contains_invalid_file_name_chars(file)
    {
        return this.contains_chars_in_str(file, this.get_invalid_file_name_chars());
    }

    get_invalid_dir_name_chars()
    {
        return ['"','*',':','<','>','?','\\','|']; /*and ascii code 0x00-0x31*/
    }

    contains_invalid_dir_name_chars(dir)
    {
        return this.contains_chars_in_str(dir, this.get_invalid_dir_name_chars());
    }

    expand_proj_name_and_sub_dir(value)
    {
        const pos = value.indexOf("/");
        if (0 <= pos) {
            return { proj_name: value.substr(0, pos), sub_dir: value.substr(pos) };
        } else {
            return { proj_name: value, sub_dir: "" }
        }
    }

    contains_chars_in_str(str, arr)
    {
        for (let l=arr.length; l--;)
        {
            if (str.includes(arr[l]))
            {
                return true;
            }
        }
        return false;
    }

    save_projects()
    {
        this.storage.setItem("projects", JSON.stringify(this.projects));
    }

    save_files()
    {
        this.storage.setItem("files_"+this.current.project, JSON.stringify(this.files));
    }

    save_current()
    {
        this.storage.setItem("current", JSON.stringify(this.current));
    }
}


ready = (callback) => {
    if (document.readyState!='loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', ()=>{
        if (document.readyState=='complete') callback();
    });
}
ready(()=>{
    new shakode_t();
});

