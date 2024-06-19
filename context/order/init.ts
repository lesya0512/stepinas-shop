import { sample } from "effector";
import { getCDEKOfficesByCity, getCDEKOfficesByCityFx } from ".";

sample({
  clock: getCDEKOfficesByCity,
  source: {},
  fn: (_, data) => data,
  target: getCDEKOfficesByCityFx
})