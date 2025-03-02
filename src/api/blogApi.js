
const BackEnd_URL = import.meta.env.VITE_BACKEND_URL;
console.log('BackEnd_URL', BackEnd_URL);

export const fetchBlog =async()=>{
    try{
    const data  =  await fetch(`${BackEnd_URL}/api/get_all_blog`);

    const response = await data.json();

    return response;

    }catch(err){
        console.log('Failed to fetch the blogPost',err)
    }
}
export const fetchBlogId =async(blog_id)=>{
    try{
    const data  =  await fetch(`${BackEnd_URL}/api/get_blog/${blog_id}`);

    const response = await data.json();

    return response;

    }catch(err){
        console.log(`Failed to fetch the blog ${blog_id}`,err)
    }
}

export const CreateBlog = async(blogData) =>{

  console.log('dd',blogData);
  

    const response = await fetch(`${BackEnd_URL}/api/create_blog/`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(blogData)

    });
    const data = await response.json();
    return data;


}

export const deleteBlogId =async(blog_id)=>{
    try{
    const data  =  await fetch(`${BackEnd_URL}/api/delete_blog/${blog_id}`);

    const response = await data.json();

    return response;

    }catch(err){
        console.log(`Failed to fetch the blog ${blog_id}`,err)
    }
}