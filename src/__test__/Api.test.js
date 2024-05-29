import Api from "../Api";

test("Api test", () => {
  const data = { manufacturer: "test", model: "test", body: null, query: undefined, undefined };
  const res = Api.prepareData(data);
  expect(res).toEqual({ manufacturer: "test", model: "test" });
});
