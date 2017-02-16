import { TellatalePage } from './app.po';

describe('tellatale App', function() {
  let page: TellatalePage;

  beforeEach(() => {
    page = new TellatalePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
