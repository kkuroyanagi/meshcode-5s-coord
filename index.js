
const fs = require('fs');

const content = fs.readFileSync('..\\meshcode-5s\\5s_meshcode_20190721_132253.txt', 'utf-8');

const store = {};
content.split('\r\n').forEach(row => {
    if (row == '') { return; }
    const splited = row.split('_');
    const lon = splited[0];
    const lat = splited[1];
    if (store[lon]) {
        if (store[lon][lat]) {
            // console.log('err:' + row);
            // 何もしない
        } else {
            store[lon][lat] = true;
        }
    } else {
        store[lon] = {};
        store[lon][lat] = true;
    }
})

for(let lon in store){
    
}

console.log('終了');
