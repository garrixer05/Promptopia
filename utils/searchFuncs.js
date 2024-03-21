

export const searchByUsername = (username,posts)=>{
    let filteredPosts = posts.filter((post)=>{
        return post.creator.username === username;
    });
    return filteredPosts;
}
export const searchByEmail = (email,posts)=>{
    let filteredPosts = posts.filter((post)=>{
        return post.creator.email === email;
    })
    return filteredPosts;
}
export const searchByTag = (tag,posts)=>{
    let filteredPost = posts.filter((post)=>{
        return post.tag === tag
    });
    return filteredPost;
}
export const searchInPompt = (text,posts)=>{
    let filteredPosts = posts.filter((post)=>{
        let {prompt} = post
        if (prompt.toLowerCase().match(text)){
            return post;
        }
    })
    return filteredPosts;
}