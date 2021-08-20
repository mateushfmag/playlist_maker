class Database {
    #data = {}
    constructor() {}

    async insert(key,info){
        this.#data[key] = info || {}
        return true
    }

    async delete(key){
        delete this.#data[key]
        return true
    }

    async update(key,info){
        this.#data[key] = {
            ...this.#data[key],
            ...info
        }
        return true
    }
    
}
module.exports = new Database()