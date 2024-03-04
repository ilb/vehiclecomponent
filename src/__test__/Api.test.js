import Api from "../Api";

test("Api test", () => {
  const data = {};
  const res = Api.prepareData(data);

  expect(res).toEqual({});
});
