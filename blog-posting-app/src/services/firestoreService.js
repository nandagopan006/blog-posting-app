import {
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    collection,
    getFirestore,

} from "firebase/firestore"


import app from "./firebase";
// Initialize Firestore connection
const db =getFirestore(app)

// Function to add a new blog document to Firestore
async function addBlog(title,content,authorId) {
    const blogRef = await addDoc(
        collection(db,"blogs"),
        {
            title,
            content,
            authorId,
        }
    );

return blogRef;

}

async function getBlogs(){
    const snapshot = await  getDocs(
        collection(db,"blogs")
    );

    const blogs = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
    }));

    return blogs;

}

async function updateBlog(id, title, content ,authorId) {
    // Fixed collection name from "blog" to "blogs"
    const blogRef = doc(db, "blogs", id);

    await updateDoc(blogRef, {
        title: title,
        content: content,
    });
}
async function deleteBlog(id){
    const blogRef=doc(db,"blogs",id)

    await deleteDoc(blogRef)
}



export {addBlog , getBlogs ,updateBlog , deleteBlog };
export default db;