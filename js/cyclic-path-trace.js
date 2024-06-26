
function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
    let visited = []
    let dfsVisited = []

    for (let i = 0; i < rows; i++) {
        let visitedRow = []
        let dfsVisitedRow = []
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false)
            dfsVisitedRow.push(false)
        }
        visited.push(visitedRow)
        dfsVisited.push(dfsVisitedRow)
    }
    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
    if (response === true) return Promise.resolve(true);
    return Promise.resolve(false);

}



async function dfsCycleDetectionTracePath(graphComponentMatrix, i, j, visited, dfsVisited) {
    visited[i][j] = true
    dfsVisited[i][j] = true

    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)

    cell.style.backgroundColor = 'lightblue';

    await colorPromise()


    for (let children = 0; children < graphComponentMatrix[i][j].length; children++) {
        let [crid, ccid] = graphComponentMatrix[i][j][children]
        if (visited[crid][ccid] === false) {
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, crid, ccid, visited, dfsVisited)
            if (response === true) {
                cell.style.backgroundColor = 'transparent';
                await colorPromise();
                return Promise.resolve(true);
            }
        } else if (visited[crid][ccid] === true && dfsVisited[crid][ccid] === true) {
            let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`)

            cyclicCell.style.backgroundColor = 'lightsalmon';
            await colorPromise();

            cyclicCell.style.backgroundColor = 'transparent';
            await colorPromise();
            cell.style.backgroundColor = 'transparent';
            await colorPromise();
            return Promise.resolve(true);
        }

    }
    dfsVisited[i][j] = false
    return Promise.resolve(false);
}
