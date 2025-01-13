class APIFilters {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword 
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                }
            } 
            : {}

        this.query = this.query.find({...keyword})
        return this
    }

    

    // filter method
    filters(){
        const queryCopy = {...this.queryStr};

        // fields to remove
        const fieldsToRemove = ["keyword", "page"];
        fieldsToRemove.forEach((element) => delete queryCopy[element]);

        // advance filter for price and rating according to gte, gt,lt,ltr
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        // result 
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    // pagination method
    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * ((currentPage - 1));

        this.query = this.query.limit(resPerPage).skip(skip)
        return this;
    }
}

export default APIFilters