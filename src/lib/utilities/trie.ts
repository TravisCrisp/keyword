export class TrieNode {
    constructor() {
        this.children = {};
        this.isEndpoint = false;
    }
}

export class RouteTrie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(path) {
        const segments = path.split("/").filter(Boolean);
        let node = this.root;

        for (const segment of segments) {
            if (!node.children[segment]) {
                node.children[segment] = new TrieNode();
            }
            node = node.children[segment];
        }

        node.isEndpoint = true;
    }

    search(path) {
        const segments = path.split("/").filter(Boolean);
        let node = this.root;

        for (const segment of segments) {
            if (!node.children[segment]) {
                return false;
            }
            node = node.children[segment];
        }

        return node.isEndpoint;
    }
}

export function populateTrie(allowedRoutes, prefix, trie) {
    for (const route of allowedRoutes) {
        if (typeof route === "string") {
            trie.insert(`${prefix}/${route}`);
        } else if (typeof route === "object") {
            const [key, subRoutes] = Object.entries(route)[0];
            populateTrie(subRoutes, `${prefix}/${key}`, trie);
        }
    }
}