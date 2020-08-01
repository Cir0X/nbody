import simulate from './simulation.js';
import createMyModule from './cpp/nbody.js';

function startSimulation() {

    createMyModule().then((module) => {
        console.log('WASM Module loaded');
        monitorSimulation(false);
        monitorSimulation(true);
    });
}

function monitorSimulation(module, wasm) {
    const result = [];
    const ns = [5, 10, 100, 500, 1000, 10000, 100000];
    ns.forEach((n) => {
        const start = performance.now();
        if (!wasm) {
            simulate(n, 1000); // JS
        } else {
            module.ccall('simulate', 'v', ['number', 'number'], [n, 1000]); // WASM
        }
        const end = performance.now();
        const timeTaken = end - start;
        // console.log(n, 'planets took', timeTaken, 'ms');
        result.push({ n: n, timeTaken: timeTaken });
    });

    console.log(JSON.stringify(result));
    console.table(result);

}

window.startSimulation = startSimulation;