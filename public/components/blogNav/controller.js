import {BLOGNAV_MODEL} from '/components/blogNav/model.js'


export const renderBlogNav = function(root, parentStateLifter, navState){
    const blogNav = document.createElement("div");
    blogNav.id = "blogNav"

    const sectionsList = document.createElement("ul")
    blogNav.appendChild(sectionsList)

    let postId = 0; 
    for(const section of BLOGNAV_MODEL){
        const sectionWrapper = document.createElement("li")
        sectionWrapper.className = "blogSectionWrapper"
        sectionsList.appendChild(sectionWrapper)

        const blogSection = document.createElement("span")
        blogSection.className = "blogSection"
        blogSection.innerHTML = section.sectionName
        sectionWrapper.appendChild(blogSection)

        const postList = document.createElement("ul")
        sectionWrapper.appendChild(postList)

        for(const postInfo of section.posts){
            const post = document.createElement("a")
            post.className = "blogEntry"
            post.innerHTML = postInfo.title
            post.href = postInfo.filePath
            post.addEventListener("click", updateBlogNav(this, navState, post, parentStateLifter))
            post.id = "post" + postId
            postId++

            if(post.id == navState){
                post.classList.add("activeBlogEntry")
            }
            postList.appendChild(post)
        }

    }

    root.appendChild(blogNav)
}

const updateBlogNav = function(e, navState, clickedElement, parentStateLifter){
    console.log(e)
    clickedElement.classList.add("activeBlogEntry")
}

/*
<ul>
<li class = "blogSectionWrapper">
    <span class = "blogSection"> Infra/Devops</span>
    <ul>
        <a class = "blogEntry activeBlogEntry" >1 - Configure VPS for Node server</a>
        <a class = "blogEntry " >2 - Cronjobs</a>
        <a class = "blogEntry " >* As of Nov/14 this navbar is mocked/under development</a>
    </ul>
</li>
</ul>
*/
