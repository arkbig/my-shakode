class shakode_t
{
    constructor ()
    {
        this.init_storage();

        this.init_elements();

        if (this.is_exists_storage_data()) {
            this.restore_from_storage();
        }
        this.blur_code();

        this.flip_to_learning_code();
        this.close_burger_menu();
        this.close_save_dialog();

        this.init_events();
    }

    init_storage()
    {
        this.storage = localStorage;
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
        /*
         # storage rule
         current: ｛ project: %｛proj_name}, path: %｛file_path} }
         projects: [%｛proj_name},...]
         paths_%｛proj_idx}: [%｛file_path},...]
         teacher_%｛proj_idx}_%｛path_idx}: ｛ last_update_date: %｛update_date}, blob: %｛raw_data} }
         learning_%｛proj_idx}_%｛path_idx}: ｛ last_update_date: %｛update_date}, blob: %｛raw_data} }
         tmp_%｛proj_idx}_%｛path_idx}: ｛ last_update_date: %｛update_date}, blob: %｛row_data} }
         */
        this.projects = [];
        this.paths = [];
        this.current = {};
        this.current_project_idx = -1;
        this.current_path_idx = -1;
    }

    init_elements()
    {
        this.target_info = document.getElementById("target_info");
        this.loaded_project_selection = document.getElementById("loaded_project_selection");
        this.loaded_project_placeholder = document.getElementById("loaded_project_placeholder");
        this.loaded_path_selection = document.getElementById("loaded_path_selection");
        this.loaded_path_placeholder = document.getElementById("loaded_path_placeholder");
        this.code_menu = document.getElementById("code_menu");
        this.concentration_button = document.getElementById("concentration_button");
        this.flip_button = document.getElementById("flip_button");
        this.current_page = document.getElementById("current_page");
        this.save_button = document.getElementById("save_button");
        this.save_as_button = document.getElementById("save_as_button");
        this.current_path = document.getElementById("current_path");
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
    }

    init_events()
    {
        this.loaded_project_selection.addEventListener("change", ()=>{
            this.changed_project();
        });

        this.loaded_path_selection.addEventListener("change", ()=>{
            this.changed_file();
        });

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

    is_exists_storage_data()
    {
        return this.storage.length > 0;
    }

    restore_from_storage()
    {
        const storage_current = this.storage.getItem("current");
        if (storage_current) {
            this.current = JSON.parse(storage_current);
            if (!this.current.project || !this.current.path) {
                this.current = {
                  project:null,path:null
                };
            }
        }
        const storage_projects = this.storage.getItem("projects");
        if (storage_projects) {
            this.projects = JSON.parse(storage_projects);
            if (this.projects.length) {
                let fragment = document.createDocumentFragment();
                for (let i=0,e=this.projects.length; i < e; ++i) {
                    let opt = document.createElement("option");
                    opt.innerText = this.projects[i];
                    fragment.appendChild(opt);
                }
                this.loaded_project_placeholder.style.display = "none";
                this.loaded_project_selection.appendChild(fragment);
            } else {
                this.projects = [];
            }
        }
        if (this.current.project) {
            this.current_project_idx = this.projects.indexOf(this.current.project);
        }
        if (this.projects.length && this.current_project_idx < 0) {
            this.current_project_idx = 0;
            this.current.project = this.projects[this.current_project_idx];
        }
        if (0 <= this.current_project_idx) {
            this.loaded_project_selection.value = this.current.project;
            const storage_paths = this.storage.getItem("paths_"+this.current_project_idx);
            if (storage_paths) {
                this.paths = JSON.parse(storage_paths);
                if (this.paths.length) {
                    let fragment = document.createDocumentFragment();
                    for (let i=0,e=this.paths.length; i < e; ++i) {
                        let opt = document.createElement("option");
                        opt.innerText = this.paths[i];
                        fragment.appendChild(opt);
                    }
                    this.loaded_path_placeholder.style.display = "none";
                    this.loaded_path_selection.appendChild(fragment);
                } else {
                    this.paths=[];
                }
            }
            if (this.current.path) {
                this.current_path_idx = this.paths.indexOf(this.current.path);
            }
            if (this.paths.length && this.current_path_idx < 0) {
                this.current_path_idx = 0;
                this.current.path = this.paths[this.current_path_idx];
            }
            if (0 <= this.current_path_idx) {
                this.loaded_path_selection.value = this.current.path;
                const storage_teacher = this.storage.getItem("teacher_"+this.current_project_idx+"_"+this.current_path_idx);
                if (storage_teacher) {
                    const teacher_obj = JSON.parse(storage_teacher);
                    if (teacher_obj.blob) {
                        this.teacher_code.innerText = teacher_obj.blob;
                    }
                }
                const storage_learning = this.storage.getItem("learning_"+this.current_project_idx+"_"+this.current_path_idx);
                if (storage_learning) {
                    const learning_obj = JSON.parse(storage_learning);
                    if (learning_obj.blob) {
                        this.learning_code.innerText = learning_obj.blob;
                    }
                }
            }
        }
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
        this.current_page.innerHTML = "Teacher.<rt>current_is</rt>";
    }

    flip_to_learning_code()
    {
        this.learning_code.style.display = "block";
        this.teacher_code.disabled = true;
        this.teacher_code.style.zIndex = -1;
        this.save_as_button.style.visibility = "hidden";
        this.flip_button.value = "Flip to teacher code.";
        this.current_page.innerHTML = "Learning.<rt>current_is</rt>";
    }

    save_learning_code()
    {
        const key = "learning_"+this.current_project_idx+"_"+this.current_path_idx;
        const value = {
             "last_update": Date.now(),
             "blob": this.learning_code.value
        };
        this.storage.setItem(key, JSON.stringify(value));
    }

    save_teacher_code()
    {
        const key = "teacher_"+this.current_project_idx+"_"+this.current_path_idx;
        const value = {
             "last_update": Date.now(),
             "blob": this.teacher_code.value
        };
        this.storage.setItem(key, JSON.stringify(value));
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
                        this.loaded_project_placeholder.style.display = "none";
                        let opt = document.createElement("option");
                        opt.innerText = proj_name;
                        this.loaded_project_selection.appendChild(opt);
                    }
                    this.current.project = proj_name;
                    this.loaded_project_selection.value = proj_name;
                    this.changed_project();
                    this.save_projects(proj_name);

                    const file_path = sub_dir + "/" + name_value;
                    if (! this.paths.includes(file_path)) {
                        this.paths.push(file_path);
                        this.loaded_path_placeholder.style.display = "none";
                        let opt = document.createElement("option");
                        opt.innerText = file_path;
                        this.loaded_path_selection.appendChild(opt);
                    }
                    this.current.path = file_path;
                    this.loaded_path_selection.value = file_path;
                    this.changed_file();
                    this.current_path.innerHTML = file_path + "<rt>current_is</rt>";
                    this.save_paths();

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
            return {
              proj_name: value.substr(0, pos), sub_dir: value.substr(pos)
            };
        } else {
            return {
              proj_name: value, sub_dir: ""
            };
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

    save_paths()
    {
        this.storage.setItem("paths_"+this.current_project_idx, JSON.stringify(this.paths));
    }

    save_current()
    {
        this.storage.setItem("current", JSON.stringify(this.current));
    }

    changed_project()
    {
        this.current_project_idx = this.projects.indexOf(this.loaded_project_selection.value);
    }

    changed_file()
    {
        this.current_path_idx = this.paths.indexOf(this.loaded_path_selection.value);
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

