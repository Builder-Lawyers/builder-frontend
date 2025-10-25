// orval.config.cjs
module.exports = {
  petstore: {
    output: {
      prettier: true,
      mode: "tags-split",
      target: "src/shared/api/",
      schemas: "src/shared/api/model",
      client: "fetch",
      override: {
        mutator: {
          path: "src/shared/api/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "http://localhost:8080/docs/openapi.yaml",
    },
  },
  petstoreZod: {
    input: {
      target: "http://localhost:8080/docs/openapi.yaml",
    },
    output: {
      mode: "tags-split",
      client: "zod",
      target: "src/shared/api/",
      fileExtension: ".zod.ts",
      override: {
        zod: {
          generateEachHttpStatus: false,
        },
      },
    },
  },
};
