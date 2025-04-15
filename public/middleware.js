export const generateMiddleware=()=>{
    return{
        load: ()=>{
            try {
                return new Promise((resolve, reject)=>{
                    const result = {};
                    fetch("/bookings").then(r => r.json()).then(annunci => {
                        result.annunci=annunci;
                        fetch("/types").then(r => r.json()).then(types => {
                            result.types=types;
                            resolve(result);
                        }).catch(err => {
                            reject(err);
                        })
                    }).catch(err => {
                        reject(err);
                    })
                });
                
            }
            catch (e) {
                console.error(e);
            }
        },

        delete: (id) =>{
            try {
                return new Promise((resolve, reject) => {
                    fetch("/delete/"+id, {
                        method: "delete",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(r => r.json()).then(data => {
                        return resolve(data);
                    }).catch(err => {
                        reject(err);
                    })
                });
            }
            catch (e) {
                console.error(e);
            }
        },
        insert: (annuncio) => {
            const fetchOptions = {
                method: 'post',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(annuncio)
            };

            try {
                return new Promise((resolve, reject) => {
                    fetch("/insert", fetchOptions).then(r => r.json()).then(data => {
                        resolve(data);
                    }).catch(err => {
                        reject(err);
                    })
                });   
            } catch (e) {
                console.error(e);
            }
        }
    }
}
