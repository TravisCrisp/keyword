
export class TrieNode {
    children: Record<string, TrieNode>;
    isEndpoint: boolean;

    constructor() {
        this.children = {};
        this.isEndpoint = false;
    }
}

export class RouteTrie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(path: string): void {
        const segments = path.split("/").filter(Boolean);
        let node = this.root;

        for (const segment of segments) {
            if (!node.children[segment]) {
                node.children[segment] = new TrieNode();
            }
            node = node.children[segment];
        }

        node.isEndpoint = true; // Mark the last node as a valid endpoint
    }

    search(path: string): boolean {
        const segments = path.split("/").filter(Boolean);
        let node = this.root;

        for (const segment of segments) {
            if (!node.children[segment]) {
                return false; // Route does not exist
            }
            node = node.children[segment];
        }

        return node.isEndpoint; // Return true if it's a valid endpoint
    }
}

export function populateTrie(
    allowedRoutes: (string | Record<string, any>)[],
    prefix: string,
    trie: RouteTrie
): void {
    for (const route of allowedRoutes) {
        if (typeof route === "string") {
            trie.insert(`${prefix}/${route}`.replace(/\/\//g, "/")); // Normalize double slashes
        } else if (typeof route === "object") {
            const [key, subRoutes] = Object.entries(route)[0];
            populateTrie(subRoutes as (string | Record<string, any>)[], `${prefix}/${key}`, trie);
        }
    }
}