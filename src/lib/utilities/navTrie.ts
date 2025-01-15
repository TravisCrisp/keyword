
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

        node.isEndpoint = true;
    }

    search(path: string): boolean {
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

export function populateTrie(
    hierarchy: Record<string, any> | Record<string, any>[],
    prefix: string,
    trie: RouteTrie
): void {
    // Ensure hierarchy is an array
    const entries = Array.isArray(hierarchy) ? hierarchy : [hierarchy];

    for (const entry of entries) {
        if (entry.slug) {
            // Construct the full path using the slug.
            const currentPath = `${prefix}/${entry.slug}`.replace(/\/\//g, "/");
            trie.insert(currentPath);

            // Recursively process `items`, `pages`, and `collections` if they exist.
            if (entry.items && Array.isArray(entry.items)) {
                populateTrie(entry.items, currentPath, trie);
            }
            if (entry.pages && Array.isArray(entry.pages)) {
                populateTrie(entry.pages, currentPath, trie);
            }
            if (entry.collections && Array.isArray(entry.collections)) {
                populateTrie(entry.collections, currentPath, trie);
            }
        }
    }
}