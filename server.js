var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const marked = require('marked')

const markdownFolder = path.join(__dirname, 'blog_posts/')

const markdownFiles = fs.readdirSync(markdownFolder)
for(const file of markdownFiles){
    filePath = path.join(markdownFolder, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const html = marked.parse(fileContent)
    fs.writeFileSync(markdownFolder + file.replace('.md', '.html'), html);
}

const public = path.join(__dirname, '');

app.use('/', express.static(public));
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/test', express.static(public));
app.get('/test/:component', function(req, res) {
    const componentsFolder = path.join(__dirname, 'components/')
    const allComponents = fs.readdirSync(componentsFolder)
    const component = req.params.component
    
    if (allComponents.includes(component)){
        res.sendFile(path.join(public, `components/${component}/test/test.html`));
    }
    
    else{
        res.sendStatus(404);
    }
});


app.listen(8080);