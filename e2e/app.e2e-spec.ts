import { ChitfundsuiPage } from './app.po';

describe('chitfundsui App', function() {
  let page: ChitfundsuiPage;

  beforeEach(() => {
    page = new ChitfundsuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
