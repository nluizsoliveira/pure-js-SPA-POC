var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const marked = require('marked')

const markdownFolder = path.join(__dirname, 'public/pages_content/blog_posts/')

const markdownFiles = fs.readdirSync(markdownFolder)
for(const file of markdownFiles){
    filePath = path.join(markdownFolder, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const html = marked.parse(fileContent)
    fs.writeFileSync(markdownFolder + file.replace('.md', '.html'), html);
}

const public = path.join(__dirname, 'public');
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'components/experience/test/test.html'));
});

app.use('/', express.static(public));

app.listen(8080);