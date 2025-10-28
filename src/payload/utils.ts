import config from "@payload-config";
import { getPayload as getPayloadBase } from "payload";

export function getPayload() {
  return getPayloadBase({ config });
}
