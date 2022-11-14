const express = require('express');
const path = require('path');
const {BlogRenderer} = require('./preRenderers.js');

const blogRenderer = new BlogRenderer();
blogRenderer.renderBlog()

const app = express();
app.listen(8080);

const publicFolder = path.join(__dirname, 'publicFolder');
app.use('/', express.static(publicFolder));
app.get('/', function(req, res) {
    res.sendFile(path.join(publicFolder, 'index.html'));
});

app.use('/blog', express.static(publicFolder));
app.get('/blog/:section/:postId', function(req, res) {
    isValidBlogPost(req.params)
        ? res.sendFile(path.join(publicFolder, 'index.html'))
        : res.sendStatus(404);
});

const isValidBlogPost = function(params){
    const ALL_SECTIONS = blogRenderer.allSections
    const IDS = Array.from(Array(10).keys()) // To be refactored

    const section = params.section
    const postId = parseInt(params.postId)

    return ALL_SECTIONS.includes(section) && IDS.includes(postId)
}

/* DEVELOPMENT ONLY 
app.use('/test', express.static(publicFolder));
app.get('/test/:component', function(req, res) {
    const componentsFolder = path.join(publicFolder, 'components')
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

