var fs = require('fs');
var path = require('path');
const marked = require('marked');

class BlogRenderer {
    constructor(){
        this.blogFolder = path.join(__dirname, '/public/components/blog/')
        this.allSectionsFolder = path.join(this.blogFolder, '/sections')
        this.allSections = fs.readdirSync(this.allSectionsFolder)
    }

    renderBlog(){
        this.renderBlogPosts()
        this.renderBlogNav()
    }

    renderBlogPosts(){
        for(const section of this.allSections){
            const sectionFolder = path.join(this.allSectionsFolder, section)
            this.renderSection(sectionFolder)
        }
    }

    renderSection(sectionFolder){
        const allPostsFiles = fs.readdirSync(sectionFolder)
        for(const postFile of allPostsFiles){
            this.renderPost(sectionFolder, postFile)
        }
    }

    renderPost(sectionFolder, postFile){
        const postPath = path.join(sectionFolder, postFile)
        const postMarkdown = fs.readFileSync(postPath, 'utf-8')
        const postHTML = marked.parse(postMarkdown)
        fs.writeFileSync(
            postPath.replace('.md', '.html')
            ,postHTML
            );
    }

    renderBlogNav(){
        console.log("mocked")
    }
    
}

module.exports = {
    BlogRenderer
}