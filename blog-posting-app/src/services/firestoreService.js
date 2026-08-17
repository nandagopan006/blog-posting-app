import {
    addDoc,
    collection,
    getFirestore,
} from "firebase/firestore"


import app from "./firebase";
// Initialize Firestore connection
const db =getFirestore(app)

// Function to add a new blog document to Firestore
async function addBlog(title,content) {
    const blogRef = addDoc(
        collection(db,"blogs"),
        {
            title:title,
            content:content,
        }
    );

return blogRef;

}
export {addBlog};
export default db;