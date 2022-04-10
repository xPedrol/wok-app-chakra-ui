export function toMatrix(results: any) {
    results = Object.keys(results).map((key) => {
        return results ? results[key] : [];
    });
    results = results.map((results1: any) => {
        return Object.keys(results1).map((key) => {
            return results1 ? results1[key] : {};
        });
    });
    return results;
}