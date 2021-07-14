export const entityToFormProduct = (arrays) => {
    let temp = [];
    for (let en of arrays) {
        let entity = {
            "id": en.productId,
            "name": en.productName,
            "image": en.image || 'http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg',
            "image2": "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png",
            "price": en.price,
            "rating": en.rating,
            "categoryId": en.categoryId,
            "desc": en.detail,
            "comments": en.comments
        }
        temp.push(entity);
    }
    return temp;
}
export const entityToFormCategory = (arrays) => {
    let temp = [];
    for (let en of arrays) {
        let entity = {
            "id": en.categoryId,
            "name": en.categoryName,
        }
        temp.push(entity);
    }
    return temp;
}