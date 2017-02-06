import { MediaShopPage } from './app.po';

describe('media-shop App', function() {
  let page: MediaShopPage;

  beforeEach(() => {
    page = new MediaShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
