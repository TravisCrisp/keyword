export function sortPagesByPath(pages: { path: string }[]): { path: string }[] {
    return pages.sort((a, b) => {
        const pathA = a.path.split('/');
        const pathB = b.path.split('/');

        for (let i = 0; i < Math.min(pathA.length, pathB.length); i++) {
            if (pathA[i] !== pathB[i]) {
                return pathA[i].localeCompare(pathB[i]);
            }
        }

        // If one path is a prefix of the other, the shorter path should come first
        return pathA.length - pathB.length;
    });
}

