import Api from "../Api";

test("Api test", () => {
  const data = { manufacturer: "test", model: "test", body: null, query: undefined };
  Api.prepareData(data);
  expect(data).toEqual({ manufacturer: "test", model: "test" });
});
