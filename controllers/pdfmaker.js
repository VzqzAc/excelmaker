const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs');
const binPath = phantomjs.path;

module.exports = {
    createHtmlTemplate: function (data) {
        console.log("heeey");
        data = data.split("\n");

        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].split(",");
        }

        fs.writeFileSync('table-template.html', ''); //cleaning html file
        
        //Writing Html file. Creating Table
        var htmlString = '<!DOCTYPE html>' +
            '<html><head><meta charset="UTF-8">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
            '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>' +
            '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
            '</head> <body><table class="table">';
        fs.appendFileSync('table-template.html', htmlString);

        htmlString = '<thead><tr>'; //column titles
        fs.appendFileSync('table-template.html', htmlString);
        for (let i = 0; i < data[0].length; i++) {
            htmlString = "<th>" + data[0][i] + "</th>";
            fs.appendFileSync('table-template.html', htmlString);
        }
        htmlString = '</tr></thead><tbody>'; //rows
        fs.appendFileSync('table-template.html', htmlString);
        for (let i = 1; i < data.length; i++) {
            htmlString = '<tr>';
            fs.appendFileSync('table-template.html', htmlString);
            for (let j = 0; j < data[i].length; j++) {
                htmlString = "<td>" + data[i][j] + "</td>";
                fs.appendFileSync('table-template.html', htmlString);
            }
            htmlString = '</tr>';
            fs.appendFileSync('table-template.html', htmlString);
        }
        htmlString = '</tbody> </table></body></html>';
        fs.appendFileSync('table-template.html', htmlString);
        console.log("heeey1");
    },
    generatePdf: function () {
        console.log("heeey2");
        var cp = childProcess.spawnSync(binPath, ['./renderpdf.js'], { //creating PDF Table.
            cwd: process.cwd(),
            env: process.env,
            stdio: 'pipe',
            encoding: 'utf-8'
        });
        return path.join(__dirname, '../tables/tabla.pdf');
    }
}


