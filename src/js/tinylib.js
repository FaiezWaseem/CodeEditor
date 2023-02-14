class db {
    constructor(path) {
        this.path = path;
    }
    async rootPath() {
        let form = new FormData();
        form.append('getRoot', 'true');
        let options = {
            method: 'POST',
            body: form
        };
         const req = await fetch(this.path, options);
         const res = req.json()
         return res;
    }
    async getFolder(path) {
        this.error({},path)
        let form = new FormData();
        form.append('getFolder', 'true');
        form.append('path', path);
        let options = {
            method: 'POST',
            body: form
        };
         const req = await fetch(this.path, options);
         const res = req.json()
         return res;
    }
    async createFolder(folder, path) {
        this.error(folder,path)
        let form = new FormData();
        form.append('create', 'true');
        form.append('path', path);
        form.append('folder', folder);
        let options = {
            method: 'POST',
            body: form
        };
         const req = await fetch(this.path, options);
         const res = req.json()
         return res;
    }
    async createFile(path , data) {
        this.error(data,path)
        let form = new FormData();
        form.append('create', 'true');
        form.append('path', path);
        form.append('data', JSON.stringify(data));
        let options = {
            method: 'POST',
            body: form
        };
         const req = await fetch(this.path, options);
         const res = req.json()
         return res;
    }
    async getFile(path) {
        this.error({},path)
        let form = new FormData();
        form.append('get', 'true');
        form.append('path', path);
        let options = {
            method: 'POST',
            body: form
        };
         const req = await fetch(this.path, options);
         const res = req.json()
         return res;
    }
    async putFile(path =null  , data = null) {
            this.error(data,path)
            let form = new FormData();
            form.append('save', 'true');
            form.append('path', path);
            form.append('data', JSON.stringify(data));
        let options = {
            method: 'POST',
            body: form
        };
        const req = await fetch(this.path, options);
        const res = req.json()
        return res;
    
    }
    async deleteFile(path ) {
        this.error({},path)
        let form = new FormData();
        form.append('remove', 'true');
        form.append('path', path);
        let options = {
            method: 'POST',
            body: form
        };
         const req = await fetch(this.path, options);
         const res = req.json()
         return res;
    }
    error(data,path){
        if( path  == null){
            throw("Error : Function  : path parameter not present")
        }
        if(data == null){
            throw("Error : Function  : Data parameter not present")
        }
    }
}

export default new db("./src/php/index.php");


