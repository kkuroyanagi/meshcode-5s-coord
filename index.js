
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

const toCoord = (lon, lat) => {
    return [Number(lon) / 3600.0, Number(lat) / 3600.0];
}

const checkCoord = (lon, lat) => {
    if (store[lon] && store[lon][lat]) {
        return [];
    } else {
        return toCoord(lon, lat);
    }
}

const checkArround = (lon, lat) => {
    const ret = [];
    const nextlon = (parseInt(lon) + 5).toString();
    const nextlat = (parseInt(lat) + 5).toString();

    // 東隣り
    const east = checkCoord(nextlon, lat);
    if (east.length > 0) { ret.push(east); }
    // 北東隣り
    const en = checkCoord(nextlon, nextlat);
    if (en.length > 0) { ret.push(en); }
    // 北隣り
    const north = checkCoord(lon, nextlat);
    if (north.length > 0) { ret.push(north); }

    return ret;
}

const ret = [];
for (let lon in store) {
    for (let lat in store[lon]) {
        ret.push(toCoord(lon, lat));

        // 隣接メッシュの有無を調べ、無ければ座標追加
        const neighbors = checkArround(lon, lat);
        if(neighbors.length > 0){
            ret.push(neighbors);
        }
    }
}


console.log('終了');
