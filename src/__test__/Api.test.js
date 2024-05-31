/* eslint-disable n/no-missing-import, no-undef, no-undefined -- Отключаем eslint n/no-missing-import, no-undef, no-undefined */
import Api from "../Api";

test("Api test", () => {
  const testData = { manufacturer: "test", model: "test", body: null, query: undefined, undefined };
  const res = Api.prepareData(testData);

  expect(res).toEqual({ manufacturer: "test", model: "test" });
});
/* eslint-enable n/no-missing-import, no-undef, no-undefined -- Возвращаем eslint n/no-missing-import, no-undef, no-undefined */
