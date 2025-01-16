type Page = { name: string; path: string; details?: any; content?: any };
type Nav = { name: string; details?: any; pages: any[] };

export function buildPageMap(pages: Page[]): Record<string, Page> {
  return pages.reduce((map, page) => {
    map[page.path] = page;
    return map;
  }, {} as Record<string, Page>);
};

export function buildNavMap(nav: Nav[]): Record<string, Nav> {
    return nav.reduce((map, nav) => {
        map[nav.name] = nav;
        return map;
    }, {} as Record<string, Nav>);
};
