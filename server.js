var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const marked = require('marked');

app.listen(8080);

const renderBlogPosts = function(){
    const markdownFolder = path.join(__dirname, 'public/components/blog/blog_posts/')
    const markdownFiles = fs.readdirSync(markdownFolder)
    for(const file of markdownFiles){
        filePath = path.join(markdownFolder, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const html = marked.parse(fileContent)
        fs.writeFileSync(markdownFolder + file.replace('.md', '.html'), html);
    }
}

renderBlogPosts()

const public = path.join(__dirname, 'public');
app.use('/', express.static(public));
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});


app.use('/blog', express.static(public));
app.get('/blog/:category/:postId', function(req, res) {
    isValidBlogPost(req.params)
        ? res.sendFile(path.join(public, 'index.html'))
        : res.sendStatus(404);
});

const isValidBlogPost = function(params){
    const CATEGORIES = ["data_mining", "infra_devops"]
    const IDS = Array.from(Array(10).keys())
    const category = params.category
    const postId = parseInt(params.postId)
    return CATEGORIES.includes(category) && IDS.includes(postId)
}



/* DEVELOPMENT ONLY 
app.use('/test', express.static(public));
app.get('/test/:component', function(req, res) {
    const componentsFolder = path.join(public, 'components')
    const allComponents = fs.readdirSync(componentsFolder)
    const component = req.params.component
    
    if (allComponents.includes(component)){
        res.sendFile(path.join(componentsFolder, `/${component}/test/test.html`));
    }
    
    else{
        res.sendStatus(404);
    }
});
*/

