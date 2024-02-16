const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercise')
    .then(() => console.log('Connected to database...'))
    .catch(err => console.error('Error connecting to database'));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 5,
        // match:/pattern/
    },
    category: {
        type: String,
        enum: ['web', 'mobile'],
        required: true
    },
    author: String,
    date: { type: Date, default: new Date },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (value, callback) {
                setTimeout(() => {
                    const result = value && value.length > 0 && typeof value === String;
                    callback(result);
                }, 3000)
            },
            message: "A course should have at least one tag and should be string!"
        }
    },
    price: {
        type: Number,
        min: 10,
        max: 20,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: function () {
            return this.isPublished;
        }
    },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
    const course = new Course({
        name: "Test course",
        author: "Ahmad",
        tags: [1],
        isPublished: true,
        price: 10,
        category: "web"
    })
    try {
        const result = await course.save();
        console.log(result)
    } catch (err) {
        console.log(err.message)
    }
}

createCourse();

const getCourses = async () => {
    return await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/ }
        ])
        .sort({ name: 1 })
        .select('name author price')

}

const run = async () => {
    const result = await getCourses();
    console.log(result);
}

// run();

const updateCourse = async (id) => {
    const result = await Course.updateMany({ price: { $gte: 15 } }, {
        $set: {
            author: "Ali",
            isPublished: false,
        }
    })
    console.log(result);
}

// updateCourse('5a68fdf95db93f6477053ddd')

const deleteCourse = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid Id");
        return;
    }
    const course = await Course.find({});
    console.log(course);
    const result = await Course.findOneAndDelete({ _id: id })
    console.log(result);
}

// deleteCourse('5a68fde3f09ad7646ddec17e')