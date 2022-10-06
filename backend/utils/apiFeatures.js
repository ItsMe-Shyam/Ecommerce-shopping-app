class Apifeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        /* here we are making a copy of queryStr because we have to manipulate it and we can't write
        "const queryCopy = this.queryStr" because javascript stores it as a reference to any object so if we changed queryCopy then this.queryStr will also get changed..........
        */
        const queryCopy = { ...this.queryStr };
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach(key => delete queryCopy[key]);

        // we are converting queryCopy to string to use 'replace' method
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(lt|gt|lte|gte)\b/g, key => `$${key}`);

        // here we are converting 'queryStr' back to object as find method requires an object...
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = this.queryStr.page;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;

    }
}

module.exports = Apifeatures;