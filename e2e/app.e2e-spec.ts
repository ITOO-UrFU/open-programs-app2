import { Opa2Page } from './app.po';

describe('opa2 App', () => {
  let page: Opa2Page;

  beforeEach(() => {
    page = new Opa2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
