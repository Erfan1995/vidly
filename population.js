const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const AuthorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', AuthorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Author'
    // }
    authors: {
        type: [AuthorSchema],
        required: true
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function addAuthor(courseId, author) {
    const course = await Course.findOne({ _id: courseId });
    course.authors.push(author);
    console.log(course);
    const updatedcourse = await course.save();
    console.log(updatedcourse);
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    console.log(course);
    const author = course.authors.id(authorId);
    console.log(author);
    author.remove();
    course.save();
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id')
        .select('name author');
    console.log(courses);
}

async function updateAuthor(courseId) {
    const result = await Course.updateOne({ _id: courseId }, {
        $unset: {
            'author.name': "Qasim"
        }
    });
}
// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course',
//     [
//         new Author({ name: 'Ali', website: 'http://ali.com' }),
//         new Author({ name: "Ahmad", website: 'http://ahmad.com' })
//     ])

// listCourses();

// updateAuthor('65cd6c7ea7ffc65043a988b7')

// addAuthor('65ce9cd5fee26d98efed36d3', new Author({ name: 'Far', website: 'http://ar.com' }));
removeAuthor('65ce9cd5fee26d98efed36d3', '65ce9cd5fee26d98efed36d1');