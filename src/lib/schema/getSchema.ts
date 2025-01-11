import schemaData from "./schema.json"

type Schema = {
  [key: string]: {
    "@id": string;
    "@type": string;
    "rdfs:comment": string;
    "rdfs:label": string;
    properties: string[];
  };
};

export const getSchema = (key: string) => {
  const schema = schemaData as Schema;
  if (schema && schema[key]) {
    return schema[key];
  }
  return null;
}