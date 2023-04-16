import dbConnect from "../../../utils/dbConnect"
import Category from "../../../models/Category";

const handler = async (req,res) => {
    await dbConnect();

    const {method} = req;

    if(method === "GET"){
        try {
            const categories = await Category.find();
            res.status(200).json(categories);

        } catch (err) {
            console.log(err);
        }
    }

    if(method === "POST"){
        try {
            const newCategory = await Category.create(req.body);
            res.status(201).json(newCategory);
        } catch (err) {
            console.log(err);
        }
    }

}

export default handler;