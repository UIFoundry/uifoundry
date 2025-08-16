import { getPayload as getPayloadBase } from "payload";
import config from "@payload-config";

export function getPayload() {
  return getPayloadBase({ config });
}
