import Category from "../model/category.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Category
export const createCategory = asyncHandler(async (req, res) => {

    const { name, color } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Category Name Required",
        });
    }

    const category = await Category.create({
        name,
        color,
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        category,
    });

});

// Get Categories
export const getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find({
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        categories,
    });

});

// Update Category
export const updateCategory = asyncHandler(async (req, res) => {

    const category = await Category.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user._id,
        },
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json({
        success: true,
        category,
    });

});

// Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {

    await Category.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        message: "Category Deleted Successfully",
    });

});