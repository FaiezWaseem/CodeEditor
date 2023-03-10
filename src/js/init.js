import db from "./tinylib.js"
const codeEditor = {
    // To add a custom path edit currentDir key EX : "/var/user/home/"
    // leave null to auto detect server root path
    currentDir: null,
    rootPath: null,
    selectedFile: null,
    fileIcon: (ext, name = null) => {
        switch (ext) {
            case "gif":
                return "./src/php/index.php?dw=" + name;
            case "JPEG":
                return "./src/php/index.php?dw=" + name;
            case "JPG":
                return "./src/php/index.php?dw=" + name;
            case "jpg":
                return "./src/php/index.php?dw=" + name;
            case "jpeg":
                return "./src/php/index.php?dw=" + name;
            case "png":
                return "./src/php/index.php?dw=" + name;
            case "PNG":
                return "./src/php/index.php?dw=" + name;
            case "ico":
                return "./src/php/index.php?dw=" + name;
            case "folder":
                return "./src/images/Folder-icon.png";
            case "tar":
                return "./src/images/Tar-icon.png";
            case "rar":
                return "./src/images/rar-icon.png";
            case "php":
                return "./src/images/Mimetype-php-icon.png";
            case "zip":
                return "./src/images/zip-icon.png";
            case "html":
                return "./src/images/Other-html-5-icon.png";
            case "css":
                return "./src/images/css-3-icon.png";
            case "js":
                return "./src/images/javascript--v1.png";
            case "doc":
                return "./src/images/Microsoft-Office-Word-icon.png";
            case "docx":
                return "./src/images/Microsoft-Office-Word-icon.png";
            case "ppt":
                return "./src/images/Microsoft-Office-PowerPoint-icon.png";
            case "pptx":
                return "./src/images/Microsoft-Office-PowerPoint-icon.png";
            case "json":
                return "./src/images/app-json-icon.png";
            case "sql":
                return "./src/images/Sql-runner-icon.png";
            case "pdf":
                return "./src/images/Adobe-PDF-Document-icon.png";
            case "apk":
                return "./src/images/apk.png";
            case "mp3":
                return "./src/images/music-icon.png";
            case "wav":
                return "./src/images/music-icon.png";
            case "m4a":
                return "./src/images/music-icon.png";
            case "ogg":
                return "./src/images/music-icon.png";
            case "java":
                return "./src/images/Java-icon.png";
            case "py":
                return "./src/images/text-x-python-icon.png";
            default:
                return "./src/images/Document-icon.png";
        }
    },
    loadfiles: function (files = []) {
        document.getElementById("files")
            .innerHTML = '';

        files.forEach(item => {
            document.getElementById("files")
                .innerHTML +=
                `<li onclick='codeEditor.ItemClicked(${JSON.stringify(item)})' data-long-press-delay="500" ><a  data="${item.name}"><img src="${item.is_dir ? this.fileIcon("folder") : this.fileIcon(item.ext, this.currentDir + "/" + item.name)}">${item.name}</a></li>`;
        });
    },
    ItemClicked: function (e) {
        this.loader(true)
        const path = this.currentDir + "/" + e.name;
        if (e.is_dir) {
            this.currentDir = path;
            db.getFolder(path).then(res => {
                // directory files recieved  
                if (res.status === 200) {
                    window.codeEditor.loadfiles(res.data)
                    this.loader(false)
                }

            }).catch(err => {
                this.loader(false);
                this.alert(err, "red")
            })
        } else {
            this.selectedFile = e.name;
            let temp = e.name.split(".");
            if (this.isValidFile(temp[temp.length - 1])) {
                editor.setOptions({
                    mode: 'ace/mode/' + temp[temp.length - 1]
                })
            }
            db.getFile(path).then(res => {
                if (res.status === 200) {
                    editor.setValue(res.data, -1)
                    editor.currentfile = path;
                    this.loader(false)
                }
            }).catch(err => {
                this.loader(false);
                this.alert(err, "red")
            })
        }
    },
    init: function () {
        this.loader(true);
        // get root directory
        if (this.currentDir === null || this.currentDir === undefined) {
            db.rootPath().then(path => {
                if (path.status === 200) {
                    // load root directory
                    this.rootPath = path.data;
                    this.currentDir = path.data;
                    db.getFolder(path.data).then(res => {
                        // directory files recieved  
                        if (res.status === 200) {
                            window.codeEditor.loadfiles(res.data)
                            this.loader(false);
                        }

                    }).catch(err => {
                        this.loader(false);
                        this.alert(err, "red")
                    })
                }
            }).catch(err => {
                this.loader(false);
                this.alert(err, "red")
            })

        } else {
            this.rootPath = this.currentDir;
            this.reload();
        }

        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 's') {
                this.loader(true)
                // Prevent the Save dialog to open
                e.preventDefault();
                if (editor.currentfile) {

                    db.putFile(editor.currentfile, editor.getValue()).then(res => {
                        if (res.status === 200) {
                            this.alert("File Saved")
                            this.loader(false)
                        }
                    })
                } else {
                    this.alert("No File Selected !")
                    this.loader(false)
                }
            }
        });
        document.querySelector(".save").onclick = () => {
            this.loader(true)
            if (editor.currentfile) {
                db.putFile(editor.currentfile, editor.getValue()).then(res => {
                    if (res.status === 200) {
                        this.alert("File Saved")
                        this.loader(false)
                    }
                })
            } else {
                this.alert("No File Selected")
                this.loader(false)
            }
        }

        document.querySelector("#cfolder").onclick = () => {
            this.loader(true)
            db.createFolder(document.getElementById("folder").value, this.currentDir)
                .then(res => {
                    if (res.status === 200) {
                        this.alert(res.data)
                        this.reload()
                    } else {
                        this.alert(res.data)
                    }
                    this.loader(false)
                });
            const modals = document.querySelectorAll(".modal");
            modals.forEach((modal) => modal.classList.remove("active"));
        }
        document.querySelector("#cfile").onclick = () => {
            console.log(document.getElementById("file").value)
            db.putFile(this.currentDir + "/" + document.getElementById("file").value, "").then(res => {
                if (res.status === 200) {
                    this.alert(res.status_message)
                    this.loader(false)
                    this.reload()
                }
            });
            const modals = document.querySelectorAll(".modal");
            modals.forEach((modal) => modal.classList.remove("active"));
        }

        var isOpen = true;
        document.querySelector(".menu").onclick = () => {
            if (isOpen) {
                document.getElementById("sidebar").style.width = "0%";
                document.getElementById("editor").style.left = "0%";
                isOpen = false;
            } else {
                document.getElementById("sidebar").style.width = "60%";
                document.getElementById("editor").style.left = "20%";
                isOpen = true;
            }
        }

        const btns = document.querySelectorAll("[data-target]");
        const close_modals = document.querySelectorAll(".close-modal");

        btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                document.querySelector(btn.getAttribute("data-target")).classList.add("active");
            });
        });

        close_modals.forEach((btn) => {
            btn.addEventListener("click", () => {
                const modal = btn.closest(".modal");
                try {
                    modal.classList.remove("active");
                } catch (error) {

                }
            });
        });

        document.addEventListener('long-press', (e) => {
            console.log(e.target.getAttribute("data"))
            this.selectedFile = e.target.getAttribute("data");
            var menu = document.querySelector('.menu2');
            console.log(e.detail.clientX, e.detail.clientY)
            menu.style.left = e.detail.clientX + 'px';
            menu.style.top = e.detail.clientY + 'px';
            menu.classList.add('menu-show');
        });
        document.addEventListener('click', function () {
            document.querySelector('.menu2').classList.remove('menu-show');
        })
        document.getElementById("shareFolder").onclick = () => {
            const path = window.codeEditor.currentDir + "/" + window.codeEditor.selectedFile;
            const a = document.createElement("a")
            a.href = "./src/php/index.php?dw=" + path;
            document.body.appendChild(a)
            a.click();
        }
        document.getElementById("openFolder").onclick = () => {
            db.getFolder(window.codeEditor.currentDir + "/" + window.codeEditor.selectedFile).then(res => {
                // directory files recieved  
                if (res.status === 200) {
                    window.codeEditor.loadfiles(res.data)
                    this.loader(false);
                    this.currentDir = window.codeEditor.currentDir + "/" + window.codeEditor.selectedFile;
                }

            }).catch(err => {
                this.loader(false);
                this.alert(err, "red")
            })
        }
        document.getElementById("folderDelete").onclick = () => {
            this.loader(true);
            db.deleteFile(this.currentDir + "/" + this.selectedFile)
                .then(res => {
                    if (res.status === 200) {
                        this.reload()
                        this.loader(false);
                        this.alert(this.selectedFile + " Removed !");
                        this.selectedFile = null;
                    }
                })
        }
        const dropArea = document.body;
        // drag and drop
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault(); //preventing from default behaviour
            document.body.style.border = "4px dashed green"
        });

        //If user leave dragged File from DropArea
        dropArea.addEventListener("dragleave", (event) => {
            console.log(event)
            document.body.style.border = "0px solid green"
        });
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault(); //preventing from default behaviour
            document.body.style.border = "0px solid green"
            let files = event.dataTransfer.files;
            this.upload(files)
        });


        let isClosed = false;
        document.getElementById("close-shell").onclick = () => {
            if (!isClosed) {
                document.querySelector('#terminal').style.display = "none";
                document.querySelector('#close-shell').innerHTML = "&#8648;";
                isClosed = true;
            } else {
                document.querySelector('#close-shell').innerHTML = "&times;";
                document.querySelector('#terminal').style.display = "block";
                isClosed = false;
            }
        }



    },
    previousDir: function () {
        this.loader(true);
        var temp = window.codeEditor.currentDir;
        let str = window.codeEditor.currentDir.split("/")
        str.pop();
        str = str.toString();
        str = str.replaceAll(",", "/");
        this.currentDir = str;
        db.getFolder(str).then(res => {
            // directory files recieved  
            if (res.status === 200) {
                window.codeEditor.loadfiles(res.data)
                this.loader(false);
            } else {
                this.loader(false);
                this.currentDir = temp;
                this.alert(res.status_message, "red")
            }

        }).catch(err => {
            this.loader(false);
            this.alert(err, "red")
        })
    },
    loader: function (show = true) {
        if (show) {
            document.querySelector(".loader").style.display = "block"
        } else {
            document.querySelector(".loader").style.display = "none"
        }
    },
    alert: function (message = "Message :", color = "green") {
        document.querySelector(".alert").style.display = "block"
        document.querySelector(".alert").innerText = message
        document.querySelector(".alert").style.backgroundColor = `var(--${color})`

        setTimeout(() => {
            document.querySelector(".alert").innerText = message
            document.querySelector(".alert").style.display = "none"
            document.querySelector(".alert").style.backgroundColor = `var(--${color})`
        }, 3000)

    },
    reload: function () {
        db.getFolder(this.currentDir).then(res => {
            // directory files recieved  
            if (res.status === 200) {
                window.codeEditor.loadfiles(res.data)
                this.loader(false);
            }

        }).catch(err => {
            this.loader(false);
            this.alert(err, "red")
        })
    },
    upload: function (files = []) {
        $.fcup({

            upId: 'upid', //Upload the id of the dom

            upShardSize: '3', //Slice size, (maximum per upload) in unit M, default 3M

            upMaxSize: '9216', //Upload file size, unit M, no setting no limit supported 9GB

            upUrl: './src/php/file.php?p=' + this.currentDir, //File upload interface

            files: files,


            //The interface returns a result callback, which is judged according to the
            // data returned by the result, and can return a string or json for judgment processing
            upCallBack: function (res, id) {

                // ??????
                var status = res.status;
                // ??????
                var msg = res.message;
                // url
                var url = res.url + "?" + Math.random();

                // Already done
                if (status == 2) {
                    console.log("Done Id = Size : " + id);
                    alert("File Done " + id);
                    //   document.getElementById("f"+id).innerText = "Done";
                }

                // still uploading
                if (status == 1) {
                    console.log(msg);
                    alert(msg);
                }

                // The interface returns an error
                if (status == 0) {
                    // Stop uploading trigger $.upStop function
                    $.upErrorMsg(msg);
                }

                if (status == 3) {
                    alert(100);
                    console.log(msg)
                    alert(msg)
                    jQuery.upErrorMsg(msg);
                }
            },

            upEvent: function (num, id) {
                console.log(num + "%");
                alert(num + "%");
            },

            upStop: function (errmsg) {
                console.log("Uploading Failed .... " + errmsg);
            },

            upStart: function () {
                console.log(0 + "%");
                console.log("Uploading Started ....");
                alert("Uploading Started ....");
            },
            listfiles: function (files) {
                console.log(files)
                //      for (let i = 0; i < files.length; i++) {
                //        const element = files[i];
                //        document.getElementById("filesbdy").innerHTML +=  `
                //        <tr>
                //      <th scope="row">${i+1}</th>
                //      <td>${element.name}</td>
                //      <td>${humanFileSize(element.size)}</td>
                //      <td id="f${element.size}">0%</td>
                //    </tr>
                //        `

                //      }
            }

        });
        function alert(message, color = "green") {
            document.querySelector(".alert").style.display = "block"
            document.querySelector(".alert").innerText = message
            document.querySelector(".alert").style.backgroundColor = `var(--${color})`

            setTimeout(() => {
                document.querySelector(".alert").innerText = message
                document.querySelector(".alert").style.display = "none"
                document.querySelector(".alert").style.backgroundColor = `var(--${color})`
            }, 3000)
        }
        function humanFileSize(size) {
            var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
            return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        }
    },
    isValidFile: function (ext) {
        switch (ext) {
            case "js":
                return true;
            case "html":
                return true;
            case "css":
                return true;
            case "php":
                return true;
            case "java":
                return true;
            case "ini":
                return true;
            case "fortran":
                return true;
            case "ejs":
                return true;
            case "sql":
                return true;
            default:
                return false;
        }
    }
}
export default codeEditor;