//алгоритм Бойера-Мура
let arg = process.argv;
let fs = require('fs')
let T = arg[2];
let S = fs.readFileSync(arg[3], "utf8")
let n = S.length
let m = T.length

let N = new Array()
let StopTable = new Array()

for (j = 0; j < T.length - 1; j++)
    N[T.charAt(j)] = j + 1

let suffshift = new Array()
let z = new Array()
let maxZidx = 0
let maxZ = 0

for (let j = 0; j <= m; j++) {
    z[j] = 0
    suffshift[j] = m
}
let ans = new Array();
for (let j = 1; j < m; j++) {
    if (j <= maxZ)
        z[j] = Math.min(maxZ - j + 1, z[j - maxZidx])
    while (j + z[j] < m && T.charAt(m - 1 - z[j]) == T.charAt(m - 1 - (j + z[j])))
        z[j]++;
    if (j + z[j] - 1 > maxZ) {
        maxZidx = j;
        maxZ = j + z[j] - 1;
    }
}

for (let j = m - 1; j > 0; j--)
    suffshift[m - z[j]] = j;

r = 0;
for (let j = 1; j <= m - 1; j++)
    if ((j + z[j]) == m)
        for (; r <= j; r++)
            if (suffshift[r] == m) suffshift[r] = j;


i = 0
bound = 0

while (i <= n - m) {
    j = m - 1
    while (j >= bound && S.charAt(i + j) == T.charAt(j))
        j--
    if (j < bound) {
        ans.push(i + 1);
        bound = m - suffshift[0]
        j = -1
        i += suffshift[0];
    } else {
        bound = 0
        if (!N[S.charAt(i + m - 1)])
            StopTable[S.charAt(i + j)] = 0
        else
            StopTable[S.charAt(i + j)] = N[S.charAt(i + m - 1)]
        i = Math.max((i + suffshift[j + 1]), (i + j + 1 - StopTable[S.charAt(i + j)]))
    }
}
console.log("Количество подстрок в строке:"+ans.length);
console.log("Номера элементов в которые зашла подстрока: "+ans.join(', ')+".")
