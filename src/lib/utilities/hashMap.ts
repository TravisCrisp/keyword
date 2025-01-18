type Page = { name: string; path: string; details?: any; content?: any };
type Nav = { name: string; details?: any; pages: any[] };

export function buildPageMap(pages: Page[]): Record<string, Page> {
  return pages
    .sort((a, b) => {
      const aParts = a.path.split('/');
      const bParts = b.path.split('/');

      // Compare the common prefix first
      for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
        if (aParts[i] !== bParts[i]) {
          return aParts[i].localeCompare(bParts[i]);
        }
      }

      // If one is a prefix of the other, the shorter one should come first
      return aParts.length - bParts.length;
    })
    .reduce((map, page) => {
      map[page.path] = page;
      return map;
    }, {} as Record<string, Page>);
};

export function buildNavMap(nav: Nav[]): Record<string, Nav> {
  return nav.reduce((map, nav) => {
    map[nav.name.toLowerCase()] = nav;
    return map;
  }, {} as Record<string, Nav>);
};
