import { buildArticleUrl } from "./onwards";

describe("onwards", () => {
  test("should build article url from path ", () => {
    const pathBefore = "/onwards/and/then/some/path/";
    const pathAfter = "https://www.theguardian.com/and/then/some/path/";

    expect(buildArticleUrl("onwards", pathBefore)).toBe(pathAfter);
  });
});
