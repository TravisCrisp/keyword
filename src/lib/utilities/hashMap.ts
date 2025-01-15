type Page = { name: string; path: string; details?: any; content?: any };

export function buildPageMap(pages: Page[]): Record<string, Page> {
  return pages.reduce((map, page) => {
    map[page.path] = page;
    return map;
  }, {} as Record<string, Page>);
};